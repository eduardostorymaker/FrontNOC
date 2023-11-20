import { gql } from "@apollo/client"


import createApolloClient from "../../lib/apollo-client";
import ApolloQuery from "../../lib/apollo-query";

import ContactCard from "../../Components/Contacts/ContactCard";



export default async function Contacts() {
   
    const queryTeams = `
    query {
        workteams {
          data {
            attributes {
              name,
              description
            }
          }
        }
      }
    `

    const queryList = `
    query {
        datacontacts {
            data {
                attributes {
                    value,
                    type {
                        data {
                            attributes {
                                type
                            }
                        }
                    },
                    workteam {
                        data {
                            attributes {
                                name
                            }
                        }
                    }
                }
            }
        }
    }
    `

    const client = createApolloClient();
    const dataTeams = await ApolloQuery(client, queryTeams)
    const datalist = await ApolloQuery(client, queryList)
    console.log("dataTeams")
    console.log(dataTeams)

 
    return(

        <div className="grid grid-cols-4 grid-flow-row p-4 gap-4">
            {
                dataTeams?.workteams.data.map( item => 
                    <ContactCard key={item.id} name={item.attributes.name} description={item.attributes.description} list={datalist} />
                )
            }
        </div>
  
    )
}

