# Advanced React & GraphQL

My interpretation of WesBos [Advanced React & GraphQL](https://AdvancedReact.com) course where I basically will change bits of styling to make this project something that is more close to what how I would style it. 

# Learnings

It will be hard to capture all the things that I am have learnt through this course as there are many things, anyhow this is my attempt: 

## Overall react stuff

- **Styled components**: I have to admit I have been using it poorly, so I am very glad to learn that I can style child html tags within a specific style component. Also I never user IntelliSense for Styled components, now I can't live without [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components);
- **GlobalStyles**: Whenever using Styled Components it is possible to have Global Style component that will take care of the global styles for us as long as we create a HOC that injects those stylings;
- **Javascript nesting chaining**: Love it, best way to check it a given object exists and to avoid so many errors
- **Intel.NumberFormat API**: Excellent API to format numbers for you without needing to instal a library, [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
- **Custom React Hooks**: defining functions that clean state of the form in the hook itself. A good example [here](https://github.com/tiagofsanchez/learning-advanced-react/blob/main/sick-fits/frontend/hooks/useFormInput.js)
- **fieldset tag and aria-labels property**: use a combination of fieldset tab, aria-labels and css to properly style a form. A good example of that can be see [here](https://github.com/tiagofsanchez/learning-advanced-react/blob/main/sick-fits/frontend/components/CreateProduct.js)
- **How to create a gated Sign in Component**: or basically how to force the user to sign in for a url that he should have access to if he is signed out of out application. 
- **Using React Context**: in this case we used it to control the cart drawer and needed to create the HOC that will provide the cart state to all components on the project. 

## Nextjs:

- **Server Side Rendering**: Having worked with react and Gatsby I knew the differences between Client Side Rendering and Static Site Generator, however I this was my first time working with Server Side Rendering. If you really want to better understand this differences I would def suggest this video from [Ahmad Awais](https://www.youtube.com/watch?v=6nuRlaNFd4g)
- **Routing in Nextjs**: there are 2 different ways to query, (1) Query string routing or (2) File based routing. Or I would even say that we could probably use a combination of both;


## Apollo Client:

- **graphQl queries and mutations**: Learning not only how to query keystone graphQl API, but also how to user apollo client hooks such as useQuery and useMutation to be able to perform those actions on the client side;
- **Caching data and managing catch**: Managing cache with apollo not only with the server renders data every time, but also when we delete something on the client so that the user can see

## Keystone with Typescript:

That was a bit tricky as I really need to learn Typescript on the fly...however I can say totally worth it given the fab things that Typescript gives you out of the box, e.g. prompting props from Keystone like magic.

- **Schema definition**: defining all the data schemas types and relationships was a very interesting accomplishment;
- **Authentication**: so that the user can have, not only access to the information and the graphQl API, but also the keystone backend;
- **Writing custom graphQl mutations**: creating mutations that are totally customizable so that the user user can have a better experience. The best example that we will find here is the `addToCart` custom mutation;
- **Role control in user sessions**: control user roles on the individual sessions of the user by defining it on the backend and consuming in on the different user sessions. This is typically managed by the permissions at the user level; 
- **Rule based functions**: logical functions to list access, for example the owner of a given product and the admin will be the only 2 user roles that can actually update and delete a given product. Another good example will a user of the website will not be able to view other users neither to change his role to do so.



