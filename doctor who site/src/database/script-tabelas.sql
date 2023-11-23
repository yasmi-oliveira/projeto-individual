create database doctorwho;
use doctorwho;

create table usuario(
idusuario int primary key auto_increment,
nome varchar(15),
email varchar(45),
senha varchar(30),
username varchar(15) unique);



select * from usuario;


