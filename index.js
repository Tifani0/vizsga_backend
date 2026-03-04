const { PrismaClient, Role, Profession } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

app.get("/providers", async (req, res) => {
  const providers = await prisma.user.findMany({
    where: {
      role: Role.PROVIDER,
    },
    include: {
      services: true,
    },
  });
  res.json(providers);
});
// ahol a profession alapján szűrjük a szolgáltatókat, hogy csak a fodrászokat, műkörmösöket vagy kozmetikusokat kapjuk meg és a frontend használja
app.get("/hairdressers", async (req, res) => {
  const hairdressers = await prisma.user.findMany({
    where: {
      role: Role.PROVIDER,
      profession: Profession.Fodrász,
    },
    include: {
      services: true,
    },
  });
  res.json(hairdressers);
});

app.get("/nailbuilders", async (req, res) => {
  const nailbuilders = await prisma.user.findMany({
    where: {
      role: Role.PROVIDER,
      profession: Profession.Műkörmös,
    },
    include: {
      services: true,
    },
  });
  res.json(nailbuilders);
});
app.get("/beauticians", async (req, res) => {
  const beauticians = await prisma.user.findMany({
    where: {
      role: Role.PROVIDER,
      profession: Profession.Kozmetikus,
    },
    include: {
      services: true,
    },
  });
  res.json(beauticians);
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get("/users/:id", async (req, res) => {
  const id = Number(req.params.id);
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  res.json(user);
});

app.get("/services", async (req, res) => {
  const services = await prisma.service.findMany({
    include: {
      user: true,
    },
  });
  res.json(services);
});

app.post("/users", async (req, res) => {
  const { name, email, phonenumber, password, role } = req.body;
  const user = await prisma.user.create({
    data: { name, email, phonenumber, password, role },
  });
  res.json(user);
});

app.listen(3000, () => {
  console.log("Fut a szerver");
});
