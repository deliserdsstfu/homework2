from django.db import models


class Country(models.Model):
    name = models.TextField()
    capital = models.TextField()
    size = models.FloatField(null=True)
    citizens = models.FloatField(null=True)
    maps = models.ManyToManyField('Media', blank=True)

    def __str__(self):
        return self.name

class Employee(models.Model):
    first_name = models.TextField()
    last_name = models.TextField()
    year_of_birth = models.IntegerField()
    lebenslauf = models.ManyToManyField('Media', blank=True)
    years_in_company = models.TextField(null=True)

    def __str__(self):
        return '%s %s (%s)' % (self.first_name, self.last_name, self.year_of_birth)


class Event(models.Model):
    CHOICES = (
        ('p', 'Party'),
        ('c', 'Convention'),
        ('g', 'Graduation'),
        ('k', 'Konzert')
    )

    title = models.TextField()
    genre = models.CharField(max_length=1, choices=CHOICES, null=True)
    date = models.DateField()
    plot = models.TextField()
    duration = models.PositiveIntegerField(help_text='in Days')
    country = models.ForeignKey(Country, on_delete=models.CASCADE, null=True)
    worker = models.ManyToManyField(Employee, blank=True)
    rating = models.PositiveIntegerField(null=True)
    pictures = models.ManyToManyField('Media', blank=True)

    def __str__(self):
        return self.title





class Media(models.Model):
    original_file_name = models.TextField()
    content_type = models.TextField()
    size = models.PositiveIntegerField()
