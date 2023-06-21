from django.db import models
from django.core.validators import RegexValidator
from .choices import product_names, sizes, shops, salesmen

# Create your models here.
class Product(models.Model):
    name = models.CharField('товар', choices=product_names, max_length=36)
    size = models.CharField('размер', choices=sizes, max_length=21)
    non_standard_size = models.CharField('нестандартный размер', max_length=7, validators=[
        RegexValidator(
            regex='^([0-9]{2,3}[x][0-9]{2,3}){1}$',
            message='Не правильный формат: 2 или 3 цифры, английский x, 2 или 3 цифры',
            code='invalid_size'
        )
    ], blank=True, null=True)
    price = models.IntegerField('Цена в евро')
    
    def __str__(self):
        size = self.non_standard_size if self.size == 'Не стандартный размер' else self.size
        return f'{self.name} размера {size}, по цене {self.price} EUR'
    
    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'

class Client(models.Model):
    phone = models.CharField('телефон', max_length=9, validators=[
        RegexValidator(
            regex='^(0)[0-9]{8}$',
            message='Не правильный формат: 0, затем 8 цифр',
            code='invalid_number'
        )
    ], unique=True, primary_key=True)
    name = models.CharField('имя', max_length=64)
    address = models.TextField('адрес')
    
    def __str__(self):
        return f'Клиент {self.name} с номером телефона {self.phone}'
    
    class Meta:
        verbose_name = 'Клиент'
        verbose_name_plural = 'Клиенты'

class Sale(models.Model):
    date = models.DateField('дата')
    shop = models.CharField('магазин', choices=shops, max_length=16)
    salesman = models.CharField('продавец', choices=salesmen, max_length=16)
    products = models.ManyToManyField(Product, verbose_name='продукты')
    client = models.ForeignKey(Client, verbose_name='клиент', on_delete=models.SET_NULL, null=True)
    
    def __str__(self):
        return f'Продажа от {self.date} от {self.salesman}'
    
    class Meta:
        verbose_name = 'Продажа'
        verbose_name_plural = 'Продажи'