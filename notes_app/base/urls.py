from django.urls import path,include
from . import views

urlpatterns = [
    path('', views.get_all_notes, name='get_all_notes'),
    path('notes/add/', views.add_note, name='add_note'),
    path('notes/<slug:slug>/', views.get_single_note, name='get_single_note'),
    path('notes/edit/<slug:slug>/', views.put_note, name='put_note'),
    path('notes/delete/<slug:slug>/', views.delete_note, name='delete_note'),
    path('notes/filter/<str:category>/', views.search_with_topic, name='search_with_topic'),
    path('notes/search/<str:query>/', views.filter_notes_by_title, name='filter_notes_by_title'),
]