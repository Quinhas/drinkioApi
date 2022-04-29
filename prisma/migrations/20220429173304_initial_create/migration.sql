-- CreateTable
CREATE TABLE "drinks" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "alcoholic" BOOLEAN NOT NULL,
    "glassId" INTEGER NOT NULL,
    "instructions" JSON NOT NULL,
    "thumb" VARCHAR(150),
    "ingredients" JSON NOT NULL,
    "measures" JSON NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_Drink" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "desc" VARCHAR(30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_Category" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "glasses" (
    "id" SERIAL NOT NULL,
    "desc" VARCHAR(30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_Glass" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_desc_key" ON "categories"("desc");

-- CreateIndex
CREATE UNIQUE INDEX "glasses_desc_key" ON "glasses"("desc");

-- AddForeignKey
ALTER TABLE "drinks" ADD CONSTRAINT "FK_Drink_Category" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "drinks" ADD CONSTRAINT "FK_Drink_Glass" FOREIGN KEY ("glassId") REFERENCES "glasses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
