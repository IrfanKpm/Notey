from django.db import models
from django.utils.text import slugify

class Note(models.Model):
    CATEGORY = (
        ("BUSINESS","Business"),
        ("PERSONAL","Personal"),
        ("IMPORTANT","Important")
    )
    title = models.CharField(max_length=200)
    body = models.TextField()
    slug = models.SlugField(unique=True,blank=True)
    category = models.CharField(max_length=15,choices=CATEGORY,default="PERSONAL")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            # Automatically generate slug from title
            self.slug = slugify(self.title)
            counter = 1
            original_slug = self.slug
            # Ensure the slug is unique
            while Note.objects.filter(slug=self.slug).exists():
                self.slug = f"{original_slug}-{counter}"
                counter += 1

        super(Note,self).save(*args, **kwargs)

