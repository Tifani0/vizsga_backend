const { PrismaClient, Role, Profession} = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const u1 = await prisma.user.create({
    data: { name: "Nagy Annamária",
        email:"nagy.annamari@gmail.com",
        password:"Passw123",
        phonenumber: "06301234567",
        role: Role.PROVIDER,
        profession: Profession.Műkörmös
     }
  })
  const u2 = await prisma.user.create({
    data: { name: "Kiss Bernadett",
        email:"kiss.berni@gmail.com",
        phonenumber: "06301234568",
        password:"Passw1234",
        role:Role.PROVIDER,
        profession: Profession.Kozmetikus
     }
  })
  const u3 = await prisma.user.create({
    data: { name: "Fehér Zoltán",
        email:"feher.zoltan@gmail.com",
        phonenumber: "06301234569",
        password:"Passw12345",
        role:Role.PROVIDER,
        profession: Profession.Fodrász
     }
  })


  

  await prisma.service.createMany({
    data: [
      { 
      "name": "Műköröm építés",
      "userId": u1.id,
      "description": "Műköröm építés szolgáltatásunkkal gyönyörű és tartós körmöket varázsolunk Önnek.",          
      "duration": 60,
      "price": 7000
    },
     { 
      "name": "Hajvágás",
      "userId": u3.id,
      "description": "Hajvágás szolgáltatásunkkal friss és stílusos hajat biztosítunk Önnek.",          
      "duration": 40,
      "price": 5000
    },
     { 
      "name": "Teljes  hajfestés",
      "userId": u3.id,
      "description": "Teljes hajfestés szolgáltatásunkkal friss és stílusos hajat biztosítunk Önnek.",          
      "duration": 120,
      "price": 10000
    },
    { 
      "name": "Teljes  arckezelés",
      "userId": u2.id,
      "description": "Teljes arckezelés szolgáltatásunkkal friss és stílusos arckezelést biztosítunk Önnek.",          
      "duration": 60,
      "price": 8000
    }
    
    ]
  })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
