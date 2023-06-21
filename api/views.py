from rest_framework.views import APIView, Response
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from .choices import product_names, sizes, shops, salesmen
from .models import Sale
from .serializers import SaleSerializer

# Create your views here.
class UserView(APIView):
    def get(self, request):
        return Response(request.user.username)

class ChoicesView(APIView):
    def get(self, request):
        choices = {
            'product_names': product_names,
            'sizes': sizes,
            'shops': shops,
            'salesmen': salesmen
        }
        for key, value in choices.items():
            value = map(lambda el: el[0], value)
            choices[key] = value
        return Response(choices)
    
class CreateSaleView(CreateAPIView):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer
    
class ListSalesView(ListAPIView):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer
    permission_classes = (IsAuthenticated,)
    
class RetrieveSaleView(RetrieveAPIView):
    lookup_url_kwarg = 'pk'
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer
    permission_classes = (IsAuthenticated,)