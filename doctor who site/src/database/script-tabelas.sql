create database doctorwho;
use doctorwho;

create table usuario(
idusuario int primary key auto_increment,
nome varchar(15),
email varchar(45),
senha varchar(30),
username varchar(15) unique);

create table serie (
idserie int primary key,
nome varchar(10));

insert into serie values(
1, 'doctor who');

create table temporada(
idtemp int primary key auto_increment,
nometemp varchar(25),
dttemp date,
fkserie int,
 foreign key (fkserie) references serie(idserie));

select * from usuario ;

create table avaliacao(
fkusuario int,
fktemp int, 
avaliacao int,
primary key (fkusuario, fktemp),
foreign key (fkusuario) references usuario(idusuario),
foreign key (fktemp) references temporada(idtemp));

insert into temporada values
(1, 'temporada um', '1950-03-21', 1),
(2, 'temporada dois', '1960-04-12', 1);

create table quiz(
tentativa int primary key auto_increment,
fkserie int,
fkusuario int, 
qtd_acertos int, 
foreign key (fkserie) references serie(idserie),
foreign key (fkusuario) references usuario(idusuario));




