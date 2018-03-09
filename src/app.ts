import * as Koa from 'koa'
import * as KoaRouter from 'koa-router'
import * as koaBody from 'koa-bodyparser'
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa'

import myGraphQLSchema from './schema'

const app = new Koa()
const router = new KoaRouter()
const graphqlMiddleware = graphqlKoa({ schema: myGraphQLSchema })

const GRAPHQL_ENDPOINT = '/graphql'

router.get(GRAPHQL_ENDPOINT, graphqlMiddleware)
router.post(GRAPHQL_ENDPOINT, graphqlMiddleware)

router.get('/graphiql', graphiqlKoa({ endpointURL: GRAPHQL_ENDPOINT}))

app.use(koaBody())
app.use(router.routes())
app.use(router.allowedMethods())


const PORT = 3000
app.listen(PORT, () => console.log(`server listening on port ${PORT}...`))
