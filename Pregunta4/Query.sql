use master
go
DROP DATABASE colegioDb
CREATE DATABASE colegioDb;
go

use colegioDb;
go

CREATE TABLE Alumno(
idAlumno int NOT NULL identity(1,1) Primary key,
nombreAlumno varchar(50) NOT NULL,
apellidosAlumno varchar(50) NOT NULL,
edadAlumno int NOT NULL,
sexo char(1) NOT NULL
)

CREATE TABLE Salon(
idSalon int NOT NULL identity(1,1) Primary Key,
codigo varchar(5) NOT NULL,
capacidad int NOT NULL,
edificio char(1) NOT NULL,
piso int NOT NULL
)

CREATE TABLE Profesor(
idProfesor int NOT NULL identity(1,1) Primary Key,
nombreProfesor varchar(50) NOT NULL,
apellidoProfesor varchar(50) NOT NULL,
especialidad varchar(50) NOT NULL,
edadProfesor int NOT NULL
)

CREATE TABLE AlumnoSalon(
	idAlumno int NOT NULL FOREIGN KEY REFERENCES Alumno,
	idSalon int NOT NULL FOREIGN KEY REFERENCES Salon,
	PRIMARY KEY (idAlumno,idSalon)
)

CREATE TABLE ProfesorSalon(
idProfesor int NOT NULL FOREIGN KEY REFERENCES Profesor,
idSalon int NOT NULL FOREIGN KEY REFERENCES Salon,
PRIMARY KEY(idProfesor,idSalon)
)

INSERT INTO Alumno VALUES('Moises','Quispe',15,'M')
INSERT INTO Alumno VALUES('Eduardo','Gamarra',16,'M')
INSERT INTO Alumno VALUES('Andrea','Lugo',17,'F')
INSERT INTO Alumno VALUES('Stefano','Batallanos',15,'M')


INSERT INTO Profesor VALUES('Miguel','Cuadros','Computación',34)
INSERT INTO Profesor VALUES('Kevin','Mendoza','Danza',42)
INSERT INTO Profesor VALUES('Rodrigo','Ballón','Matemática',47)

INSERT INTO Salon VALUES('A1',10,'A',1)
INSERT INTO Salon VALUES('A2',10,'A',2)
INSERT INTO Salon VALUES('B2',15,'B',2)

INSERT INTO AlumnoSalon VALUES(1,1)
INSERT INTO AlumnoSalon VALUES(1,3)
INSERT INTO AlumnoSalon VALUES(2,2)
INSERT INTO AlumnoSalon VALUES(3,3)
INSERT INTO AlumnoSalon VALUES(3,2)
INSERT INTO AlumnoSalon VALUES(4,3)
INSERT INTO AlumnoSalon VALUES(4,1)


INSERT INTO ProfesorSalon VALUES(1,1)
INSERT INTO ProfesorSalon VALUES(1,2)
INSERT INTO ProfesorSalon VALUES(2,2)
INSERT INTO ProfesorSalon VALUES(2,3)
INSERT INTO ProfesorSalon VALUES(3,3)
INSERT INTO ProfesorSalon VALUES(3,1)

SELECT * FROM Alumno
SELECT * FROM Profesor
SELECT * FROM Salon

/*Lista de nombre completo de profesores asignados a cada alumno*/

SELECT DISTINCT( a.nombreAlumno+' '+a.apellidosAlumno) as Alumno,p.nombreProfesor+' '+p.apellidoProfesor as Profesor
from Alumno a
INNER JOIN AlumnoSalon s
ON a.idAlumno=s.idAlumno
INNER JOIN ProfesorSalon sp
ON sp.idProfesor=s.idSalon
INNER JOIN Profesor p
ON p.idProfesor=sp.idProfesor
ORDER BY (nombreAlumno+' '+apellidosAlumno)


/*Lista de nombre completo de profesores asignados a cada salón*/
SELECT  s.codigo as Salon,(p.nombreProfesor+' '+p.apellidoProfesor)as Profesor
from Profesor p
INNER JOIN ProfesorSalon ps
ON ps.idProfesor=p.idProfesor
INNER JOIN Salon s
ON s.idSalon=ps.idSalon
ORDER BY codigo