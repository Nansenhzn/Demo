#-*-coding:UTF-8 -*-
from django.shortcuts import render_to_response
from django.template import loader, Context
from django.http import HttpResponse, HttpResponseRedirect,JsonResponse
from django.contrib import auth
from models import Users, Groups, Commands, Group
import datetime
import string
# from django.utils import simplejson
import json
from django.conf import settings
from django.utils.log import getLogger
logger=getLogger

import random, base64
from hashlib import sha1

# def ajax_G(request):
#     nid = request.GET.get('eid',None)
#     groups = Group.objects.all()
#     for g in groups:
#         if g.id == nid:
#             # gname = g.groupname
#             ginfo_dict={"gid":g.id,"gname":g.groupname,"gpermit":g.permitSudo,"gallo":g.allowRepeatedGids}
#             return HttpResponse(json.dumps(ginfo_dict), content_type='application/json')


def form_g(request):
    a=request.GET.get('b',None)
    id=int(a);
    print("1111");
    groupList = Group.objects.all()
    if a is not None:
        for g in groupList:
            if g.id == id:
                print("xxxxxx");
                ginfo_dict={"groupid":g.id,"groupname":g.groupname,"permitSudo":g.permitSudo,"allowRepeatedGids":g.allowRepeatedGids}
                return HttpResponse(json.dumps(ginfo_dict), content_type='application/json')

def edit_group(request):
    print("333333");
    groupid=request.GET.get('groupid',None)
    groupname=request.GET.get('groupname',None)
    grouppermit=request.GET.get('grouppermit',None)
    groupallo=request.GET.get('groupallo',None)
    userList=Users.objects.all()
    groupList = Group.objects.all()
    results = Commands.objects.all()
    Group.objects.filter(id=groupid).update(groupname=groupname,permitSudo=grouppermit,allowRepeatedGids=groupallo)

    return  render_to_response('home.html',locals())

#by zhaogj


def addj(request):
    username = request.GET.get('username',None)
    password = request.GET.get('password',None)
    userList = Users.objects.all()
    groupList = Group.objects.all()
    for user in userList:
        if user.username == username and user != None:
            return render_to_response('home.html',locals())
        else:
            request.session['username'] = username
    user = Users(username=username, password=password)
    user.save()
    return render_to_response('home.html',locals())


#def cur_time(request):
#    now=datetime.datetime.now()
#    return render_to_response('home.html',locals())



def group_edit(request):
    a = request.GET.get('g_1',None)
    b = request.GET.get('g_2',None)
    c = request.GET.get('g_3',None)
    d = request.GET.get('g_4',None)
    groupList=Group.objects.all()
    return render_to_response('group_edit.html',locals())
    # window.open("../group_edit.html","","width=300,height=180,top=300,left=300,location=no,Resizable=no")

def edit_Ok(request):
    a = request.GET.get('i_id',None)
    b = request.GET.get('i_name',None)

    gg=Group.objects.get(id=a)
    gg.groupname=b
    gg.save()

    groupLists = Group.objects.all()
    return render_to_response('home.html',locals())


def edit_Del(request):
    a = request.GET.get('i_id',None)
    b = request.GET.get('i_name',None)
    # groups=Group.objects.get(id=)

    Group.objects.get(id=a).delete()
    groupLists = Group.objects.all()

    return render_to_response('home.html',locals())

    # return render_to_response('home1.html')


def cur_time(request):
    now=datetime.datetime.now()
    html="<html><body>It is new %s.</body></html>" % now
    return HttpResponse(html)


def crypt(data, key):
    """RC4 algorithm"""
    x = 0
    box = range(256)
    for i in range(256):
        x = (x + box[i] + ord(key[i % len(key)])) % 256
        box[i], box[x] = box[x], box[i]
    x = y = 0
    out = []
    for char in data:
        x = (x + 1) % 256
        y = (y + box[x]) % 256
        box[x], box[y] = box[y], box[x]
        out.append(chr(ord(char) ^ box[(box[x] + box[y]) % 256]))

    return ''.join(out)


def login(request):
    username = request.GET.get('username', None)
    password = request.GET.get('password', None)
    if username is not None:
        userList = Users.objects.all()
        usertable = Users.objects.all();
        groupList = Group.objects.all();
        for user in userList:
            if user.username == username and user.password == password:
                request.session['username'] = username
                result = Commands.objects.all()
                return render_to_response('home.html', {'username': username, 'userList': userList,'results': result,'usertable':usertable,'groupList': groupList})
    return render_to_response('login.html' )

def form(request):
     a=request.GET['a']
     id=int(a);
     usertable=Users.objects.all()
     results=Commands.objects.all()
     if a is not None:
        for foo in usertable:
           if foo.id==id:
             usersid=foo.id
             usersname=foo.username
             primarygroupid=foo.group
             homedirectory=foo.homeDirectory
             password=foo.password
             fullname=foo.fullname
             ssh=foo.ssh
             email=foo.email

             editor = {'usersid': usersid, 'usersname':usersname, 'primarygroupid':primarygroupid, 'homedirectory':homedirectory,'password':password,'fullname':fullname,'ssh':ssh,'email':email}
             return  HttpResponse(json.dumps(editor),content_type='application/json')

def alter(request):
    username = request.GET.get('username1',None)
    password = request.GET.get('password1',None)
    fullname = request.GET.get('fullname1',None)
    email = request.GET.get('email1',None)
    ssh = request.GET.get('ssh1',None)
    results=Commands.objects.all()
    homeDirectory = request.GET.get("homedirectory1",None)
    userList=Users.objects.all()
    groupList = Group.objects.all();
    Users.objects.filter(username=username).update(fullname=fullname, email=email, ssh=ssh, password=password, homeDirectory=homeDirectory)
    return render_to_response('home.html',{'userList':userList,'groupList':groupList,'results':results})

def edit(request):
    # usersid=request.POST['usersid']
    username=request.GET.get('usersnamee',None)
    primarygroupid=request.GET.get('groupe',None)
    homedirectory=request.GET.get('homedirectorye',None)
    password=request.GET.get('passworde',None)
    fullname=request.GET.get('fullnamee',None)
    results=Commands.objects.all()
    ssh=request.GET.get('sshe',None)
    email=request.GET.get('emaile',None)
    print(username);
    userList=Users.objects.all()
    groupList = Group.objects.all();
    Users.objects.filter(username=username).update(group=primarygroupid,homeDirectory=homedirectory,password=password,fullname=fullname,ssh=ssh,email=email)

    return  render_to_response('home.html',{'userList':userList,'groupList':groupList,'results':results})

def add(request):
    username = request.GET.get('username',None)
    password = request.GET.get('password',None)
    fullname = request.GET.get('fullname',None)
    email = request.GET.get('email',None)
    ssh = request.GET.get('ssh',None)
    homeDirectory = request.GET.get("homedirectory",None)
    userList = Users.objects.all()
    for user in userList:
        if user.username == username and user != None:

            return render_to_response('home.html')
        else:
            request.session['username'] = username
    user = Users(username=username, password=password, fullname=fullname, email=email, ssh=ssh, homeDirectory=homeDirectory)
    user.save()
    userList = Users.objects.all()
    groupList = Group.objects.all();
    results = Commands.objects.all()
    return render_to_response('home.html', {'userList': userList,'groupList':groupList,'results':results})

def info(request):
    print("contact info")
    username1= request.GET['username']
    # username1 = request.GET.get('hiduser', None)
    userList = Users.objects.all()
    # print(username1)
    user = Users.objects.get(username=username1)
    # print(user.id)
    ul={'username': user.username, 'email': user.email, 'fullname': user.fullname, 'homedirectory': user.homeDirectory, 'password': user.password, 'ssh':user.ssh}
    return JsonResponse(ul)
    # return HttpResponse("111")
    # return HttpResponse(json.dumps(ul), content_type='application/json')

def isuser(request):
    username = request.GET.get('username',None)
    print("isuser")
    result = False
    userList=Users.objects.all()
    user=Users.objects.get(username=username)
    if user in userList:
        result = True
    # print(result)
    return HttpResponse(result)

def tencode(data, key, encode=base64.b64encode, salt_length=16):
    """RC4 encryption with random salt and final encoding"""
    salt = ''
    for n in range(salt_length):
        salt += chr(random.randrange(256))
    data = salt + crypt(data, sha1(key + salt).digest())
    if encode:
        data = encode(data)
    return data

def tdecode(data, key, decode=base64.b64decode, salt_length=16):
    """RC4 decryption of encoded data"""
    if decode:
        data = decode(data)
    salt = data[:salt_length]
    return crypt(data[salt_length:], sha1(key + salt).digest())

def run(request):
    import rpyc
    from cPickle import loads
    put_string=""
    # Module_Id='1016'
    # put_string+=Module_Id+"@@"
    # Hosts='www.szu.edu.cn'
    # put_string+=Hosts+"@@"
    if not 'ModuleID' in request.GET:
        Module_Id=""
    else:
        Module_Id=request.GET['ModuleID']
        put_string+=Module_Id+"@@"

    if not 'hosts' in request.GET:
        Hosts=""
    else:
        Hosts=request.GET['hosts']
        put_string+=Hosts+"@@"

    if not 'commandName' in request.GET:
        commandName=""
    else:
        commandName = request.GET['commandName']
        put_string+=commandName+"@@"

    if not 'sys_param_1' in request.GET:
        Sys_param_1=""
    else:
        Sys_param_1=request.GET['sys_param_1']
        put_string+=Sys_param_1+"@@"

    if not 'sys_param_2' in request.GET:
        Sys_param_2=""
    else:
        Sys_param_2=request.GET['sys_param_2']
        put_string+=Sys_param_2+"@@"

    try:
        conn=rpyc.connect('127.0.0.1', 11511)
        conn.root.login('OMuser','KJS23o4ij09gHF734iuhsdfhkGYSihoiwhj38u4h')
    except Exception,e:

        logger.error('connect rpyc server error:'+str(e))
        return HttpResponse('connect rpyc server error:'+str(e))
    print(put_string)
    put_string=tencode(put_string,settings.SECRET_KEY)
    OPresult=tdecode(conn.root.Runcommands(put_string),settings.SECRET_KEY)
    print OPresult
    # a=string.atoi(OPresult)
    # print a
    return HttpResponse(OPresult)

def command_run(request):
    import rpyc
    from cPickle import loads
    put_string=""

    Module_Id='1016'
    put_string+=Module_Id+"@@"
    Hosts='www.szu.edu.cn'
    put_string+=Hosts+"@@"
    # if not 'ModuleID' in request.GET:
    #     Module_Id=""
    # else:
    #     Module_Id=request.GET['ModuleID']
    #     put_string+=Module_Id+"@@"
    #
    # if not 'hosts' in request.GET:
    #     Hosts=""
    # else:
    #     Hosts=request.GET['hosts']
    #     put_string+=Hosts+"@@"


    if not 'sys_param_1' in request.GET:
        Sys_param_1=""
    else:
        Sys_param_1=request.GET['sys_param_1']
        put_string+=Sys_param_1+"@@"

    if not 'sys_param_2' in request.GET:
        Sys_param_2=""
    else:
        Sys_param_2=request.GET['sys_param_2']
        put_string+=Sys_param_2+"@@"

    try:
        conn=rpyc.connect('127.0.0.1', 11511)
        conn.root.login('OMuser','KJS23o4ij09gHF734iuhsdfhkGYSihoiwhj38u4h')
    except Exception,e:

        logger.error('connect rpyc server error:'+str(e))
        return HttpResponse('connect rpyc server error:'+str(e))

    put_string=tencode(put_string,settings.SECRET_KEY)
    OPresult=tdecode(conn.root.Runcommands(put_string),settings.SECRET_KEY)
    print(OPresult)
    return HttpResponse(OPresult)

def ajax_G(request):
    groupList = Group.objects.all()
    name = request.GET.get('name')
    for group in groupList:
        if group.groupname == name:
            ginfo_dict = {'name': group.groupname,'groupID': group.id, 'permit_sudo': group.permitSudo}
            return HttpResponse(json.dumps(ginfo_dict), content_type='application/json')


def addG(request):
    if 'Permit' in request.GET and request.GET['Permit']:
        permit_sudo = request.GET.get('Permit')
    else:
        permit_sudo = 0;
    if 'repeated' in request.GET and request.GET['repeated']:
        allow_repeated_GIDs = request.GET.get('repeated')
    else:
        allow_repeated_GIDs = 0;
    # if 'groupName' in request.GET and request.GET['groupName']:
    name = request.GET.get('groupName')
    p1 = Group(groupname=name, permitSudo=permit_sudo, allowRepeatedGids=allow_repeated_GIDs)
    p1.save()
    groupList = Group.objects.all()
    results = Commands.objects.all()
    return render_to_response('home.html', locals())


def delG(request):
    groupID = request.GET.get('groupID')
    Group.objects.get(id=groupID).delete()
    groupList = Group.objects.all()
    results=Commands.objects.all()
    return render_to_response('home.html', locals())

def editG(request):
    id = request.GET.get('groupID')
    name=request.GET.get('groupName')
    # print(groupID)
    # print(name)
    if 'Permit' in request.GET and request.GET['Permit']:
        permitSudo = request.GET.get('Permit')
    else:
        permitSudo = 0;
        # Groups.objects.get(groupID=groupID).update(name=name,permit_sudo=permit_sudo)
    # a = Group.objects.get(groupname=name)
    # a.groupname = name
    # a.permitSudo = permitSudo
    # a.save()
    Group.objects.filter(id=id).update(groupname=name, permitSudo=permitSudo)
    results=Commands.objects.all()
    # 更新数据
    groupList = Group.objects.all()
    return render_to_response('home.html', locals())

# def ajax_G(request):
#     groupList = Groups.objects.all()
#     name = request.GET.get('name')
#     for group in groupList:
#         if group.name == name:
#             ginfo_dict = {'name': group.name,'groupID': group.groupID, 'permit_sudo': group.permit_sudo}
#             return HttpResponse(json.dumps(ginfo_dict), content_type='application/json')


#def MemoryUsage(request):


def text(request):
    groupList = Group.objects.all()
    result = False
    name = request.GET.get('name',None)
    group = Group.objects.get(groupname=name)
    if group in groupList:
            result = True
    return HttpResponse(result)
#def user_num():
#    userList=Users.objects.all()
 #   count = 0
  #  for user in userList:
   #     count+1
    #return render_to_response('html',{'count':count})




# def login(request):
# 	username = request.POST['username']
# 	password = request.POST['password']
# 	user = auth.authenticate(username=username, password=password)
# 	if user is not None and user.is_active:
# 	 # Correct password, and the user is marked "active"
# 		auth.login(request, user)
# 		# 重新加载主页
# 		if (username=='winston'):
# 			return HttpResponseRedirect("http://127.0.0.1:8000/index/")
# 		else:
# 			return HttpResponseRedirect("http://127.0.0.1:8000/")
# 	else:
# 		# 返回登录界面
#
# 		return render_to_response('login.html')
