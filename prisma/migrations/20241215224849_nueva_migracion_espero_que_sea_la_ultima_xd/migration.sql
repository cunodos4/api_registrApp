-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('PROFESOR', 'ALUMNO');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "rut" TEXT NOT NULL,
    "primerNombre" TEXT NOT NULL,
    "segundoNombre" TEXT,
    "apellidoPaterno" TEXT NOT NULL,
    "apellidoMaterno" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "rol" "Rol" DEFAULT 'ALUMNO',
    "token" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ramos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "seccion" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ramos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clases" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3)[],
    "usuarioId" INTEGER NOT NULL,
    "ramoId" INTEGER NOT NULL,
    "asistencia" BOOLEAN NOT NULL DEFAULT false,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clases_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_rut_key" ON "Usuario"("rut");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Ramos_seccion_key" ON "Ramos"("seccion");

-- AddForeignKey
ALTER TABLE "Ramos" ADD CONSTRAINT "Ramos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clases" ADD CONSTRAINT "clases_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clases" ADD CONSTRAINT "clases_ramoId_fkey" FOREIGN KEY ("ramoId") REFERENCES "Ramos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
