import { CatType } from '../src/generated/prisma/client'
import { prisma } from './prisma'
async function main() {
    await prisma.cat.create({
        data: {
            name: "Heribert",
            donor: "Max Mustermann",
            type: CatType.CAT01,
            donation: 100.0
        },
    })
    await prisma.cat.create({
        data: {
            name: "Stella",
            type: CatType.CAT02,
            donation: 900.0
        },
    })
    await prisma.cat.create({
        data: {
            name: "Nachtschatten",
            type: CatType.CAT03,
            donation: 50.0
        },
    })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
