# Student Attendance Management System

Student Attendance Management System is a web application for managing
students, teachers, subjects, exams, exam supervision, and attendance at the
Faculty of Science, University of Algiers 1.

The application provides separate workspaces for:

- **Administrators**, who manage academic data and monitor attendance.
- **Teachers**, who view assigned exams, supervise sessions, and record
  attendance.
- **Students**, who view their academic information, exam schedule, and
  attendance history.

Attendance can be recorded by scanning a student's QR code during an exam.
The system also provides dashboards and statistics for attendance by level,
speciality, teacher, and exam.

> **Development status:** This repository is configured as a local development
> project. The current settings include development secrets, debug mode,
> permissive CORS configuration, hard-coded local API URLs, and a local MySQL
> database. Review the production checklist before deployment.

## Table of contents

1. [Application overview](#application-overview)
2. [Main capabilities](#main-capabilities)
3. [Architecture](#architecture)
4. [Repository layout](#repository-layout)
5. [Technology stack](#technology-stack)
6. [Requirements](#requirements)
7. [Database setup](#database-setup)
8. [Backend setup](#backend-setup)
9. [Frontend setup](#frontend-setup)
10. [Running the application](#running-the-application)
11. [User roles and authentication](#user-roles-and-authentication)
12. [Administrator workflow](#administrator-workflow)
13. [Teacher workflow](#teacher-workflow)
14. [Student workflow](#student-workflow)
15. [QR attendance workflow](#qr-attendance-workflow)
16. [Data model](#data-model)
17. [API reference](#api-reference)
18. [Frontend routes](#frontend-routes)
19. [Testing and validation](#testing-and-validation)
20. [Configuration](#configuration)
21. [Troubleshooting](#troubleshooting)
22. [Security and deployment checklist](#security-and-deployment-checklist)
23. [Known limitations](#known-limitations)

## Application overview

The system replaces disconnected attendance and exam-management workflows with
a single browser-based application:

```text
Administrator creates students, teachers, subjects, and exams
                         |
                         v
              Teacher assignments and supervision
                         |
                         v
        Student QR code scanned during an exam
                         |
                         v
            Attendance record stored in MySQL
                         |
                         v
        Student, teacher, and administrator statistics
```

The frontend communicates with the Django API at
`http://127.0.0.1:8000` by default. The API returns JSON responses and uses
JWT tokens for authentication.

## Main capabilities

### Academic administration

Administrators can:

- Create, list, update, and delete students.
- Create, list, update, and delete teachers.
- Create subjects/modules for a level, speciality, and semester.
- Automatically create an exam when a subject is created.
- Update exam dates, times, and amphitheatre information.
- Delete subjects and exams.
- Assign teachers to subjects.
- Assign teachers to exam surveillance.
- Browse students by speciality and academic level.
- Browse subjects by speciality, level, and semester.
- View paginated lists of students and teachers.
- Review attendance and exam statistics.
- Change their password.

### Teacher workspace

Teachers authenticate with their matricule and secret number. Their workspace
allows them to:

- View a teacher dashboard.
- View assigned subjects and exams.
- View students associated with an exam.
- Record attendance or mark a student absent.
- View surveillance assignments.
- Open the QR scanner for an exam.
- Review attendance by exam, level, and speciality.

### Student workspace

Students authenticate with their matricule and roll number. Their workspace
allows them to:

- Open a student dashboard.
- View attendance history.
- View exam schedules by semester.
- View their profile information where enabled by the frontend.

### QR-code attendance

The frontend uses `html5-qrcode` to access the device camera. A scanned QR
value is treated as the student's matricule and sent with the selected exam
name to the attendance endpoint. The backend:

1. Looks up the student by matricule.
2. Looks up the exam by subject name.
3. Verifies that the student's level and speciality match the exam.
4. Rejects duplicate attendance records.
5. Creates the attendance record when validation succeeds.

The administrator and teacher interfaces also include QR-code generation and
exam-specific scanning pages.

### Dashboards and reports

The application includes:

- Administrator counts for students, teachers, exams, and attendance.
- Student totals by speciality.
- Attendance totals by speciality and level.
- Exam completion information.
- Teacher counts and teacher workload statistics.
- Student semester statistics.
- Paginated attendance tables.
- CSV download for an exam's student attendance list.

## Architecture

### Active application

The application normally runs as two local services:

```text
React/Vite frontend (localhost:5173)
              |
              | JSON and JWT-authenticated HTTP requests
              v
Django REST API (127.0.0.1:8000)
              |
              v
        MySQL database: school2
```

The active Django project is `Backend/sb`:

- Project package: `attendance_system`
- Django app: `exams`
- Entry point: `Backend/sb/manage.py`
- URL configuration: `Backend/sb/attendance_system/urls.py`
- Database engine: MySQL
- Database name: `school2`

### Legacy Django project

The repository also contains `Backend/pfe1`, an earlier Django implementation.
It has a separate project package (`pfe1`), a separate app (`api`), a separate
database configuration (`school`), and an earlier model design.

The current frontend calls the routes defined by `Backend/sb`; it does not use
the `Backend/pfe1` API by default. Treat `Backend/pfe1` as legacy/reference
code unless you intentionally choose to run that implementation.

## Repository layout

```text
StudentAttendce_Pfe/
├── Backend/
│   ├── sb/                              # Active Django backend
│   │   ├── manage.py                    # Django management entry point
│   │   ├── attendance_system/
│   │   │   ├── settings.py              # MySQL, JWT, CORS, middleware
│   │   │   ├── urls.py                  # Active API routes
│   │   │   ├── asgi.py
│   │   │   └── wsgi.py
│   │   └── exams/
│   │       ├── models.py                # Academic and attendance models
│   │       ├── serializers.py           # API serializers
│   │       ├── views.py                 # API views and statistics
│   │       ├── auth_backends.py         # Teacher/student login backends
│   │       ├── middleware.py            # Visit logging middleware
│   │       ├── admin.py
│   │       └── migrations/
│   └── pfe1/                            # Earlier Django implementation
│       ├── manage.py
│       ├── pfe1/
│       └── api/
├── Frontend/
│   ├── package.json                     # React/Vite dependencies and scripts
│   ├── vite.config.js
│   ├── index.html
│   ├── public/                          # Public SVGs and static assets
│   └── src/
│       ├── App.jsx                      # Top-level routing
│       ├── Radmin.jsx                   # Administrator layout
│       ├── Rteacher.jsx                 # Teacher layout
│       ├── Rstudent.jsx                 # Student layout
│       ├── Pages/                       # Administrator pages
│       ├── TeacherPages/                # Teacher pages
│       ├── StudentPages/                # Student pages
│       ├── LogIn/                       # Role-specific login pages
│       └── context/                     # Protected-route and auth helpers
├── .gitignore
└── README.md
```

The repository currently contains development database files and generated
Python bytecode in some directories. Avoid committing local database contents,
credentials, generated files, or uploaded/private data.

## Technology stack

### Backend

- Python
- Django
- Django REST Framework
- Simple JWT
- MySQL
- `django-cors-headers`
- `qrcode` and Pillow for QR image generation

### Frontend

- React 19
- Vite
- React Router
- Material UI
- MUI X Charts
- Toolpad Core
- `html5-qrcode`
- `qrcode.react`
- Recharts
- SweetAlert2
- Framer Motion

The frontend dependency versions and scripts are defined in
[`Frontend/package.json`](Frontend/package.json). The active backend currently
does not contain a complete dependency manifest, so the setup commands below
install the packages required by the source code.

## Requirements

Install the following software:

- Python 3.10 or newer.
- Node.js and npm.
- MySQL Server 8 or a compatible MySQL installation.
- A modern browser with camera permission support for QR scanning.

For QR scanning, the browser must be able to access the camera. In production,
camera access normally requires HTTPS or a trusted local origin.

## Database setup

The active backend is configured for:

```text
Database engine: django.db.backends.mysql
Database name: school2
Host: localhost
Port: 3306
User: root
Password: empty by default in settings.py
```

Create the database before running migrations:

```sql
CREATE DATABASE school2 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

If your MySQL account uses a password or a non-default host, update
`Backend/sb/attendance_system/settings.py` or, preferably, move those values to
environment variables before starting the application.

## Backend setup

From the repository root:

```bash
cd Backend/sb
python -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install \
  Django \
  djangorestframework \
  djangorestframework-simplejwt \
  django-cors-headers \
  mysqlclient \
  qrcode \
  Pillow
python manage.py migrate
```

Create an administrator account:

```bash
python manage.py createsuperuser
```

The administrator login uses Django's normal username/password endpoint
(`POST /t/`). Teachers and students are created through the application or
through Django/admin data preparation.

Start the backend:

```bash
python manage.py runserver 127.0.0.1:8000
```

The Django administration site is available at:

```text
http://127.0.0.1:8000/admin/
```

### Using Pipenv

`Backend/pfe1/Pipfile` is associated with the older project and currently
contains the Python version declaration but not a complete dependency list.
For the active `Backend/sb` project, use a virtual environment and the install
commands above, or create a project-specific Pipfile with the same dependencies
before using Pipenv.

## Frontend setup

In another terminal:

```bash
cd Frontend
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Open the URL printed by Vite, normally:

```text
http://localhost:5173/
```

The frontend currently uses absolute API URLs pointing to
`http://127.0.0.1:8000`. If the backend is hosted elsewhere, update the
frontend request URLs or introduce a shared API base URL before deployment.

## Running the application

Use three terminals:

```bash
# Terminal 1: MySQL
# Start MySQL using the service manager for your operating system.

# Terminal 2: Django
cd Backend/sb
source .venv/bin/activate
python manage.py runserver 127.0.0.1:8000

# Terminal 3: React/Vite
cd Frontend
npm run dev
```

Then open `http://localhost:5173/` and choose a role:

- `/Admin` for administrator login.
- `/Student` for student login.
- `/Teacher` for teacher login.

## User roles and authentication

### Administrator

Administrators use Django username/password authentication through
`POST /t/`. The backend returns a JWT access token and refresh token. The
frontend stores them in `localStorage` as `accessToken` and `refreshToken`, and
stores `admin` as the role.

Administrator routes include student, teacher, module, exam, statistics,
settings, and logout pages.

### Teacher

Teachers use:

```json
{
  "matricul": "teacher-matricule",
  "secret_number": "teacher-secret"
}
```

The custom authentication backend finds the `teacher` record, authenticates
the related Django user, and returns JWT tokens with the `teacher` role.

### Student

Students use:

```json
{
  "matricul": "student-matricule",
  "roll_number": "student-roll-number"
}
```

The custom authentication backend finds the `Student` record and returns JWT
tokens with the `student` role.

### Protected routes

The frontend stores the selected role in `localStorage` and checks the token
with `GET /check-token/?token=<token>`. A route is accessible only when:

1. An access token exists.
2. The token is accepted by the backend.
3. The stored role matches the route's required role.

The frontend route guard is not a replacement for backend authorization.
Protected API views should also enforce permissions before production use.

## Administrator workflow

1. Sign in at `/Admin`.
2. Open the dashboard to review counts and attendance statistics.
3. Create or edit students under the student management area.
4. Create or edit teachers under the teacher management area.
5. Create modules/subjects for a speciality, level, and semester.
6. Update exam date, time, and amphitheatre information.
7. Assign teachers to subjects and exam surveillance.
8. Open an exam's attendance page to view students and attendance.
9. Use the QR scanner page to record presence when appropriate.
10. Export attendance data as CSV when reviewing an exam.

Creating a subject through `POST /subject/` also creates an `Exam` linked to
that subject. This is an important behavior when preparing the academic data.

## Teacher workflow

1. Open `/Teacher`.
2. Enter a teacher matricule and secret number.
3. Review the teacher dashboard and assigned surveillance.
4. Open an assigned exam.
5. Use the QR scanner to record student attendance, or use the attendance
   controls where available.
6. Review students, present/absent state, and exam timing.

Teacher assignment endpoints distinguish between teaching a subject and
supervising an exam. The frontend exposes both concepts in the teacher pages.

## Student workflow

1. Open `/Student`.
2. Enter a student matricule and roll number.
3. Open the student home dashboard.
4. Review attendance history.
5. Review the exam schedule for the selected semester.
6. Log out when finished.

The student dashboard requests semester statistics for `s1` and `s2`. Exam
schedule and attendance pages use the selected semester and the student's
academic information.

## QR attendance workflow

### Generating a QR code

The backend exposes `POST /generate-qr/`. The request body must contain a
`data` value:

```json
{
  "data": "student-matricule"
}
```

The response contains a base64-encoded PNG data URL:

```json
{
  "qr_code": "data:image/png;base64,..."
}
```

The frontend also contains QR-code components for displaying generated codes
and starting exam-specific scanners.

### Scanning a QR code

The scanner sends the decoded value to:

```text
POST /etu/<matricul>/exa/<exam_name>/
```

The backend rejects:

- Unknown student matricules.
- Unknown exam subjects.
- Students whose level does not match the exam.
- Students whose speciality does not match the exam.
- Duplicate attendance records for the same student and exam.

On success, the endpoint creates an `Attendance` record and returns the
serialized record.

## Data model

The active `exams` application contains the following core models.

### `subject`

Represents an academic module:

- `name`
- `level`: `l1`, `l2`, `l3`, `m1`, or `m2`
- `speciality`: information technology, physics, management, biology,
  pharmacy, or medicine
- `semester`: `s1` or `s2`

### `Exam`

Represents an exam for a subject:

- `subject`
- `date`
- `time`
- `amphi`

### `Student`

Represents a student linked to a Django user:

- `Name`: one-to-one user relation
- `matricul`
- `roll_number`
- `level`
- `speciality`

### `teacher`

Represents a teacher linked to a Django user:

- `user`
- `matricul`
- `secret_number`

### `teach`

Associates a teacher with a subject.

### `surveillance`

Associates a teacher with an exam they supervise.

### `Attendance`

Associates a student with an exam. The existence of this relation represents
attendance for the current implementation.

## API reference

The active API is served from `http://127.0.0.1:8000`.

### Authentication

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/t/` | Obtain JWT for an administrator username/password |
| `POST` | `/teacher_l/` | Obtain JWT for teacher matricule/secret number |
| `POST` | `/stud_l/` | Obtain JWT for student matricule/roll number |
| `POST` | `/refresh/` | Refresh an access token |
| `GET` | `/check-token/?token=<token>` | Check token validity |
| `POST` | `/logout/` | Log out |
| `POST` | `/change-password/` | Change the authenticated user's password |

### QR and attendance

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/generate-qr/` | Generate a QR image from a value |
| `POST` | `/etu/<matricul>/exa/<exam_name>/` | Mark student attendance |
| `PUT` | `/tea/<matricul>/exa/<exam_name>/` | Mark teacher presence |
| `PUT` | `/tea/<matricul>/exa/<exam_name>/not` | Mark teacher absence |
| `GET` | `/student/exams/<exam_id>` | List students for an exam |
| `GET` | `/student/subject/<subject_name>` | List students for a subject |

### Students

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/stud/` | Create a student |
| `GET` | `/student_list/` | List students |
| `GET` | `/student_par_specialitylevel/<speciality>/<level>` | Filter students |
| `GET` | `/student/profile/` | Get the authenticated student profile |
| `GET` | `/student/info/<id>` | Get student details |
| `PUT` | `/u_student/<id>` | Update a student |
| `DELETE` | `/student/delete/<id>/` | Delete a student |
| `GET` | `/student/exam/<semester>` | Get student exams |
| `GET` | `/studentstats/<semester>` | Get student statistics |

### Teachers

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/teacher/` | Create a teacher |
| `GET` | `/Teacher_list/` | List teachers |
| `GET` | `/teacher/info/<id>` | Get teacher details |
| `PUT` | `/u_teacher/<id>` | Update a teacher |
| `DELETE` | `/teacher/delete/<id>/` | Delete a teacher |
| `GET` | `/teacher_subjects/<semester>` | Get teacher subjects |
| `GET` | `/teacher_exams/<semester>` | Get teacher exams |
| `GET` | `/teacher_subject/<teacher_id>` | Get subjects for a teacher |
| `GET` | `/teacher/stats` | Get teacher statistics |
| `GET` | `/teacher_par_Spécialité/<speciality>` | Teacher statistics by speciality |
| `GET` | `/teacher_par_level/<level>` | Teacher statistics by level |

### Subjects and exams

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/subject/` | Create a subject and its exam |
| `GET` | `/subjects/` | List subjects |
| `GET` | `/subject/<speciality>/<level>/<semester>/` | Filter subjects |
| `PUT` | `/subject/update/<id>/` | Update a subject |
| `DELETE` | `/delete_subject/<id>` | Delete a subject |
| `GET` | `/exams/` | List exams |
| `GET` | `/exam_list/<level>/<speciality>/<semester>` | Filter exams |
| `PUT` | `/exam/update/<id>/` | Update exam details |
| `DELETE` | `/delete_exam/<id>` | Delete an exam |
| `GET` | `/exam_time/<exam_id>` | Get exam date and time by ID |
| `GET` | `/exam_time2/<exam_name>` | Get exam date and time by subject |

### Assignments and surveillance

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/modul/<subject_id>` | List subject teaching assignments |
| `GET` | `/observer/<exam_id>` | List exam surveillance assignments |
| `PUT` | `/tea/<matricul>/sub/<subject_name>/` | Assign teacher to subject |
| `PUT` | `/tea/<matricul>/sub/<subject_name>/not` | Remove teaching assignment |
| `GET` | `/teacher/<teacher>/exam/<exam>/` | Get teacher/exam assignment data |

### Statistics

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/adminstats/` | Administrator dashboard statistics |
| `GET` | `/Présences_par_Spécialité/<speciality>` | Attendance by speciality |
| `GET` | `/Présences_par_level/<level>` | Attendance by level |

Some endpoints are used with pagination. A paginated response generally
contains `count`, `next`, `previous`, and `results`.

### Authentication header

For endpoints requiring JWT authentication, send:

```text
Authorization: Bearer <access-token>
```

The frontend currently saves the token in `localStorage` after login. Review
this approach before production deployment.

## Frontend routes

### Public routes

| Route | Purpose |
|---|---|
| `/` | Role selection page |
| `/Admin` | Administrator login |
| `/Student` | Student login |
| `/Teacher` | Teacher login |
| `/LogOut` | Logout page |

### Administrator routes

The administrator workspace includes:

- `/dashboard`
- `/MenuStudent`
- `/MenuStudent/:speciality/:year`
- `/ListTeachers`
- `/MenuExams`
- `/MenuExams/:speciality/:year/:semester`
- `/MenuModules`
- `/Settings`
- Exam attendance and QR-scanner pages

### Teacher routes

The teacher workspace includes:

- `/teacher/Dashboard`
- `/teacher/ExamsAttendance`
- `/teacher/ExamsAttendance/:speciality/:year/:exam`
- `/teacher/Surveillance`
- `/teacher/Surveillance/:module/qr-scanner`

### Student routes

The student workspace includes:

- `/student/Home`
- `/student/Attendance`

Unknown routes are rendered through the frontend error page.

## Testing and validation

### Backend checks

From `Backend/sb`:

```bash
python manage.py check
python manage.py test
python manage.py makemigrations --check
```

The backend contains the Django test module at
`Backend/sb/exams/tests.py`. Add tests for authentication, attendance
validation, duplicate scans, role permissions, and statistics when extending
the project.

### Frontend checks

From `Frontend`:

```bash
npm run lint
npm run build
```

### Manual smoke test

1. Start MySQL and create the `school2` database.
2. Run migrations and create an administrator.
3. Start Django on `127.0.0.1:8000`.
4. Start Vite and open the frontend.
5. Log in as an administrator and create a subject.
6. Confirm that creating the subject creates an exam.
7. Create a student and teacher.
8. Assign the teacher to the subject and exam.
9. Generate or display a student QR code.
10. Log in as the teacher and scan the student QR code.
11. Confirm that attendance appears in the exam attendance view.
12. Log in as the student and confirm attendance and exam information.
13. Verify that scanning the same QR code again is rejected.
14. Verify that an invalid level or speciality is rejected.
15. Test logout and token expiry behavior.

## Configuration

### Backend settings

The active settings are in
`Backend/sb/attendance_system/settings.py`. Important current values include:

- `DEBUG = True`
- `ALLOWED_HOSTS = []`
- `CORS_ALLOW_ALL_ORIGINS = True`
- CORS development origin `http://localhost:5173`
- MySQL database `school2`
- Access-token lifetime of two days
- Refresh-token lifetime of seven days
- Default REST Framework permission class set to
  `IsAuthenticated`

Several individual views explicitly use `AllowAny`, including some mutation
endpoints. Review endpoint permissions before exposing the API publicly.

### Frontend API URLs

API requests are currently written directly as URLs such as:

```text
http://127.0.0.1:8000/
```

For deployment, replace these hard-coded values with an environment-based API
base URL, for example a Vite variable such as `VITE_API_URL`.

## Troubleshooting

### MySQL connection fails

- Confirm MySQL is running.
- Confirm the `school2` database exists.
- Check the host, port, user, and password in `settings.py`.
- Install the Python MySQL driver with `python -m pip install mysqlclient`.
- Check that the MySQL user has permissions on `school2`.

### CORS errors

- Confirm the frontend origin is included in `CORS_ALLOWED_ORIGINS`.
- Do not use `CORS_ALLOW_ALL_ORIGINS = True` in production.
- Restart Django after changing settings.

### Login succeeds but the page redirects home

- Check that `accessToken` and `role` exist in browser `localStorage`.
- Confirm the role is exactly `admin`, `student`, or `teacher`.
- Confirm `/check-token/` accepts the token.
- Check that the frontend is calling the same backend that issued the token.

### QR scanner cannot access the camera

- Grant camera permission to the browser.
- Use a supported browser.
- Use HTTPS in production; camera APIs may be blocked on insecure origins.
- Confirm no other application is exclusively using the camera.

### Attendance is rejected

- Confirm the scanned value is a valid student matricule.
- Confirm the exam subject name is correct.
- Confirm the student's level and speciality match the exam.
- Check whether an attendance record already exists.

### Migrations fail

```bash
cd Backend/sb
python manage.py makemigrations
python manage.py migrate
python manage.py showmigrations
```

If the database contains important data, back it up before changing or
recreating migrations.

### Frontend build or lint fails

```bash
cd Frontend
rm -rf node_modules
npm install
npm run lint
npm run build
```

Review the first reported error rather than suppressing lint or build checks.

## Security and deployment checklist

Before deploying this application:

- Move `SECRET_KEY` to an environment variable and replace the development
  value.
- Set `DEBUG = False`.
- Configure `ALLOWED_HOSTS` with the actual backend hostnames.
- Restrict CORS to the exact trusted frontend origins.
- Use HTTPS for the frontend, API, and QR scanner.
- Move MySQL credentials out of source code.
- Create a dedicated MySQL user with only the required database privileges.
- Review all `AllowAny` views and protect management/mutation endpoints.
- Enforce role-based authorization on the backend, not only in React.
- Avoid storing JWT tokens in `localStorage` when a safer production strategy
  is available.
- Add token revocation/blacklisting policy for logout and compromised tokens.
- Validate and sanitize all user-provided identifiers and uploaded data.
- Add rate limiting to login, token, QR, and mutation endpoints.
- Do not expose Django admin without strong credentials and HTTPS.
- Add audit logging for student changes, teacher assignments, exam changes, and
  attendance changes.
- Back up MySQL and test restoration.
- Configure production static files and a production WSGI/ASGI server.
- Replace hard-coded frontend API URLs with deployment configuration.
- Add automated tests for permission boundaries and attendance integrity.

## Known limitations

- The active backend depends on a locally configured MySQL database and does
  not currently provide a complete dependency manifest.
- The frontend hard-codes the local backend URL in many components.
- The current settings are development settings with debug mode and permissive
  CORS enabled.
- Several API views allow unauthenticated access even though the global REST
  Framework default is `IsAuthenticated`.
- JWTs are stored in browser `localStorage`.
- The QR attendance endpoint identifies a student by matricule and records
  attendance by creating an `Attendance` relation; the model does not include
  a separate timestamp or scan audit record.
- Attendance is represented by the existence of a record rather than a
  dedicated `is_present` field in the active model.
- The legacy `Backend/pfe1` project uses a different schema and database and
  should not be mixed with the active `Backend/sb` migrations.
- The application has no documented automated end-to-end test suite.
- Camera access and QR scanning depend on browser permissions and secure-origin
  requirements.
- The current statistics and attendance endpoints should be reviewed for
  authorization and data exposure before production use.
