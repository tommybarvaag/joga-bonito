-- CreateTable
CREATE TABLE "CageballEvent" (
    "id" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT false,
    "bookable" BOOLEAN NOT NULL DEFAULT false,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    "formattedToFromDate" TEXT NOT NULL,

    CONSTRAINT "CageballEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CageballEvent_formattedToFromDate_key" ON "CageballEvent"("formattedToFromDate");
