# Server
- yarn init
- yarn dev o npm run dev


# Paquetes

- yarn add mongoose
- yarn add dotenv
- yarn add apollo-server
- yarn add bcryptjs
- yarn add nodemon --dev
- yarn add jsonwebtoken

- yarn add aws-sdk          // Conectar a AWS bucket
- yarn add uuid             // generar ids unicas para publish aws

# Env
BBDD=URL que viene de la BD mongodb# instac
SECRET_KEY=SECRET

# AWS
 - En S3 , crear un bucket
 - Luego en Permisos, luego en Política de bucket:
 Codigo curso:
 {
     "Version": "2008-10-17",
     "Statement": [
         {
             "Sid": "AllowPublicRead",
             "Effect": "Allow",
             "Principal": {
                 "AWS": "*"
             },
             "Action": "s3:GetObject",
             "Resource": "arn:aws:s3:::NAME_BUCKET/*"
         }
     ]
 }
 - Ejemplo AWS: https://awspolicygen.s3.amazonaws.com/policygen.html
    {
    "Id": "Policy1608655953337",
    "Version": "2012-10-17",
    "Statement": [
        {
        "Sid": "Stmt1608655920938",
        "Action": "s3:*",
        "Effect": "Allow",
        "Resource": "arn:aws:s3:::instac",
        "Principal": {
            "AWS": [
            "AWS"
            ]
        }
        }
    ]
    }

 - Crear credenciales para la apliacion:
    -- Ir a CUENTA => Mis credneciales de seguridad => Usuarios : Crear un usuario con acceso mediante programacion
    -- En permisos: Asociar directamente las políticas existentes => { AdministratorAccess  }, listo ahora crear.