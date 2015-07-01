from django.conf.urls import patterns, include, url
from django.contrib import admin
from openFS import views
urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'Demo.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^login/$', views.login),
    url(r'^add/', views.add),
    url(r'^info/$', views.info),
    url(r'^alter/', views.alter),
    url(r'^isuser/',views.isuser),
    url(r'^home/', views.run),
    url(r'^addG/', views.addG),
    url(r'^delG/', views.delG),
    url(r'^editG/', views.editG),
    url(r'^form/$', views.form),
    url(r'^edit/$', views.edit),
    url(r'^ajax_G/$', views.ajax_G),
    url(r'^text/$',views.text),
    url(r'^group_edit',views.group_edit),
    url(r'^edit_Ok/',views.edit_Ok),
    url(r'^edit_Del/',views.edit_Del),
    url(r'^time/$',views.cur_time),
    url(r'^form_g/$',views.form_g),
    url(r'^edit_group/$',views.edit_group),
)
