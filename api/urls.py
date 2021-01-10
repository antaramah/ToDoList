from django.urls import path
from . import views
from django.views.generic import TemplateView

urlpatterns = [
	#path('',TemplateView.as_view(template_name='index.html')),
	path('', views.apiOverview, name="api-overview"),
	path('task-list/', views.taskList, name="task-list"),
	path('task/Active/', views.taskActive, name="task-Active"),
	path('task/Inactive/', views.taskInactive, name="task-Inactive"),	
	path('task-detail/<str:pk>/', views.taskDetail, name="task-detail"),
	path('task-create/', views.taskCreate, name="task-create"),

	path('task-update/<str:pk>/', views.taskUpdate, name="task-update"),
	path('task-delete/<str:pk>/', views.taskDelete, name="task-delete"),
]
