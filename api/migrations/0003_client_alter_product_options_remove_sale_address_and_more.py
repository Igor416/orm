# Generated by Django 4.1.1 on 2023-05-21 14:01

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_product_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='Client',
            fields=[
                ('phone', models.CharField(max_length=9, primary_key=True, serialize=False, unique=True, validators=[django.core.validators.RegexValidator(code='invalid_number', message='Не правильный формат: 0, затем 8 цифр', regex='^(0)[0-9]{8}$')], verbose_name='телефон')),
                ('name', models.CharField(max_length=64, verbose_name='имя')),
                ('address', models.TextField(verbose_name='адрес')),
            ],
        ),
        migrations.AlterModelOptions(
            name='product',
            options={'verbose_name': 'Товар', 'verbose_name_plural': 'Товары'},
        ),
        migrations.RemoveField(
            model_name='sale',
            name='address',
        ),
        migrations.RemoveField(
            model_name='sale',
            name='phone',
        ),
        migrations.AlterField(
            model_name='sale',
            name='client',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.client', verbose_name='клиент'),
        ),
    ]