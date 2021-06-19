<?php
// 获取数据
$username = $_GET['username'];
$password = $_GET['password'];
$remember = $_GET['remember'];

//  链接数据库
$link = mysqli_connect('127.0.0.1','root','root','sz2105');

$sql = "SELECT * FROM `users` WHERE `name`= '$username' ";
// 组织sql
$res = mysqli_query($link,$sql);
$row = mysqli_fetch_assoc($res);
if(!$row){
  $arr = ['status'=>0,"msg"=>"用户名不存在"];
  // echo json_encode($arr);// 用户名不存在
}else{
  if($row['password'] !== $password){
    $arr = ['status'=>0,"msg"=>"密码错误"];
    // echo json_encode($arr);// 密码错误
  }else{
    $arr = ['status'=>1,"msg"=>"登录成功"];
    if($remember){
      setcookie('username',$username,time()+7*24*3600);
    }else{
      setcookie('username',$username);
    }
  }
}

echo json_encode($arr);