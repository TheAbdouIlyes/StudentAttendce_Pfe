from django.utils.deprecation import MiddlewareMixin

class LogVisitMiddleware(MiddlewareMixin):
    def process_request(self, request):
        print(f"User visited: {request.path}")
