import { CatType } from '../src/generated/prisma/client'
import { prisma } from './prisma'

const cats = [
    {
        name: "Heribert",
        donor: "Max Mustermann",
        type: CatType.CAT01,
        donation: 100.0
    },
    {
        name: "Stella",
        type: CatType.CAT02,
        donation: 900.0
    },
    {
        name: "Nachtschatten",
        type: CatType.CAT03,
        donation: 50.0
    },
]

async function main() {
    await prisma.cat.createMany({
        data: cats,
        skipDuplicates: true,
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
