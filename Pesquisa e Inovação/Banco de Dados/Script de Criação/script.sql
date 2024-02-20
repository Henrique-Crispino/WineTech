create database WineTech;

use WineTech;

drop database winetech;

select * from vinicola;
select * from usuario;

select idUsuario, fkVinicola, nome from usuario WHERE email = 'alex@xvnovembro.com' AND senha = '123456';

-- SCRIPT DE CRIAÇÃO DE TABELAS
create table vinicola(
idVinicola int primary key auto_increment,
nome varchar(45) not null,
CNPJ char(14) not null unique,
CEP char(9) not null unique,
numero int not null,
complemento varchar(70)
);

create table usuario(
idUsuario int auto_increment,
fkVinicola int,
nome varchar(45) not null,
telefone char(11) not null,
email varchar(50) not null,
senha varchar(70) not null,
validacao tinyint,
constraint chkValidacao check(validacao in(0, 1)),
constraint fkViniUser foreign key (fkVinicola) references vinicola(idVinicola),
primary key (idUsuario, fkVinicola) 
);

create table adega(
idAdega int auto_increment,
fkVinicola int,
nome varchar(45) not null,
tempIdeal decimal(4, 2) not null,
umiIdeal int not null,
constraint fkViniAdega foreign key (fkVinicola) references vinicola(idVinicola),
primary key (idAdega, fkVinicola)
);

create table tipoVinho(
idVinho int primary key auto_increment,
tipo varchar(45) not null,
safra varchar(45),
tipoBarril varchar(45),
dataArmazenamento datetime default current_timestamp,
fkAdega int,
constraint fkAdegaTipo foreign key (fkAdega) references adega(idAdega)
);

create table sensor(
idSensor int primary key auto_increment,
tipo varchar(5) not null,
localizacao varchar(50) not null,
constraint chkSensor check(tipo in ('LM35', 'DHT11')),
fkAdega int,
constraint fkAdegaSensor foreign key (fkAdega) references adega(idAdega)
);

create table dadosSensor(
idDados int auto_increment,
fkSensor int,
registro decimal(4,2),
dataHora datetime default current_timestamp,
constraint fkSensorDados foreign key (fkSensor) references sensor(idSensor),
primary key(idDados, fkSensor) 
);


-- SELECT PARA TRAZER TEMPERATURA DO BANCO DE DADOS DE ACORDO COM O ID DA ADEGA E TIPO DO SENSOR, POIS NAO TENHO O ID DO SENSOR SALVO NO BACKEND

/*
select dS.registro as temperatura, DATE_FORMAT(dS.dataHora, '%d/%m/%Y') as data_grafico, DATE_FORMAT(dS.dataHora, '%H:%i:%s') as momento_grafico from dadosSensor as dS
join sensor as s on s.idSensor = dS.fkSensor
where s.fkAdega = ${idAdega} and s.tipo = 'DHT11' and DATE(dS.dataHora) > (NOW() - INTERVAL 7 DAY);
*/



-- SCRIPT DE INSERÇÃO DE REGISTRO
insert into vinicola (nome, CNPJ, CEP, numero, complemento)
values ('XV de Novembro', '12345678000190', '12345-678', 123, null);

insert into usuario (fkVinicola, nome, telefone, email, senha, validacao)
values 	(1, 'xvdenovembrosr', '11996131411', 'xvdenovembro@gmail.com', '123456', 0);

insert into adega (fkVinicola, nome, tempIdeal, umiIdeal)
values (1, 'Adega Leão', 15.0, 75),
       (1, 'Adega Rosé', 15.0, 75);
       
insert into tipoVinho (tipo, safra, tipoBarril, fkAdega)
values('Cabernet Sauvignon', '2020', 'Carvalho Francês', 1), 
       ('Chardonnay', '2019', 'Carvalho Americano', 1),
       ('Prosecco', '2021', 'Carvalho Americano', 2),
       ('Pinot Noir', '2018', 'Carvalho Francês', 2);
       
insert into sensor (tipo, localizacao, fkAdega)
values ('LM35', 'LocalA', 1),
       ('DHT11', 'LocalA', 1),
       ('LM35', 'LocalB', 2),
       ('DHT11', 'LocalB', 2);

insert into dadosSensor (fkSensor, registro)
values (1, 15.0),
       (2, 75),
       (3, 16.9),
       (4, 70),
       (1, 15.0),
       (2, 75),
       (3, 16.9),
       (4, 70),
       (1, 15.0),
       (2, 75),
       (3, 16.9),
       (4, 70),
       (1, 15.0),
       (2, 75),
       (3, 16.9),
       (4, 70), 
       (1, 15.0),
       (2, 75),
       (3, 16.9),
       (4, 70);

-- SCRIPT DE CONSULTA DE DADOS
select nomeEmpresa as "Empresa Mãe", responsavel as Responsável, nomeVinicola as Vinícola, nomeAdega as Adega 
		from vinicola 
			join empresa on fkEmpresa = idEmpresa
				join enderecoVinicola on fkVinicola = idVinicola
					join adega on adega.fkVinicola = idVinicola
						join usuario on usuario.fkEmpresa = idEmpresa;
                        
select nomeEmpresa as "Empresa Mãe", usuario.nome as "User", telefoneCel as "Telefone Vinícola" 
	from empresa 
		join usuario on idEmpresa = fkEmpresa;
                
select nomeVinicola as 'Vinícola', nomeAdega as Adega, tipo as "Tipo do Vinho" 
	from adega 
		join tipoVinho on fkAdega = idAdega
			join vinicola on fkVinicola = idVinicola;

select nomeVinicola as Vinícola, nomeAdega as Adega, tipoSensor as "Modelo Sensor", sensorLoc as "Localização do Sensor", 
Registro, dataHora as "Data e Hora" 
	from sensor
		join dadosSensor on fkSensor = idSensor
			join adega on fkAdega = idAdega
				join vinicola on fkVinicola = idVinicola; 
                
insert into empresa (nomeEmpresa, responsavel, telefoneResponsavel, cnpj, email, senha) 
values ('WineTech', 'admin', '11-9000000000', '000000000000000000', 'admin@winetech.com', 'saoroque');

insert into usuario (fkEmpresa, nome, telefoneCel, email, senha)
values (1, 'admin', '11-9100000000', 'useradmin@gmail.com', 'adminadmin');







insert into dadosSensor (fkSensor, registro)
values (1, 15.0),
       (2, 75),
       (3, 15.2),
       (4, 75),
       (1, 15.0),
       (2, 75),
       (3, 16),
       (4, 72),
       (1, 19.0),
       (2, 75),
       (3, 14.9),
       (4, 77),