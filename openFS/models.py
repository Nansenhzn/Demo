from django.db import models

# Create your models here.
class Users(models.Model):
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=20)
    fullname = models.CharField(max_length=20)
    email = models.CharField(max_length=30);
    homeDirectory = models.CharField(max_length=50)
    group = models.CharField(max_length=30)
    ssh = models.CharField(max_length=100)
    def __str__(self):
        return '%s' %(self.username)

class Commands(models.Model):
    commandId = models.IntegerField()
    commandName = models.CharField(max_length=100)
    class Meta:
        db_table = u'command_list'

class Groups(models.Model):
    groupID = models.IntegerField()
    name = models.CharField(max_length=30)
    permit_sudo = models.IntegerField()
    allow_repeated_GIDs = models.IntegerField()

class Group(models.Model):
	groupname=models.CharField(max_length=30)
	permitSudo=models.BooleanField()
	allowRepeatedGids=models.BooleanField()


class Hsw(models.Model):
    UsersID=models.CharField(max_length=30)
    UsersName=models.CharField(max_length=30)
    PrimaryGroupID =models.CharField(max_length=30)
    HomeDirectory=models.CharField(max_length=30)
    Shell=models.CharField(max_length=30)
    FullName=models.CharField(max_length=30)
    BuiltInUser =models.CharField(max_length=30)
    Email=models.CharField(max_length=30)
    Disablepasswordlogin=models.CharField(max_length=30)
    Lockuser=models.CharField(max_length=30)
    PermitSudo=models.CharField(max_length=30)


