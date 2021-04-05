# Advanced React & GraphQL

My interpretation of WesBos [Advanced React & GraphQL](https://AdvancedReact.com) course where I basically will change bits of styling to make this project something that is more close to what how I would style it. 

# Learnings

It will be hard to capture all the things that I am have learnt through this course as there are many things, anyhow this is my attempt: 

## Overall react stuff

- **Styled components**: I have to admit I have been using it poorly, so I am very glad to learn that I can style child html tags within a specific style component. Also I never user IntelliSense for Styled components, now I can't live without [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components);
- **GlobalStyles**: Whenever using Styled Components it is possible to have Global Style component that will take care of the global styles for us as long as we create a HOC that injects those stylings;
- **Javascript nesting chaining**: Love it!
- **Intel.NumberFormat API**: Excellent API to format numbers for you without needing to instal a library, [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
- **Custom React Hooks**: defining functions that clean state of the form in the hook itself. A good example [here](https://github.com/tiagofsanchez/learning-advanced-react/blob/main/sick-fits/frontend/hooks/useFormInput.js)
- **fieldset tag and aria-labels property**: Use a combination of fieldset tab, aria-labels and css to properly style a form. A good example of that can be see [here](https://github.com/tiagofsanchez/learning-advanced-react/blob/main/sick-fits/frontend/components/CreateProduct.js) 

## Nextjs:

- **Server Side Rendering**: Having worked with create-react-add and Gatsby I knew the differences between Client Side Rendering and Static Site Generator, however I never

## Apollo:


## Keystone:


- **Writing custom graphQl mutations**: creating mutations that are totally customizable so that the user user can have a better experience. The best example that we will find here is the `addToCart` custom mutation;
- **Role control in user sessions**: control user roles on the individual sessions of the user by defining it on the backend and consuming in on the different user sessions. This is typically managed by the permissions at the user level; 
- **Rule based functions**: logical functions to list access, for example the owner of a given product and the admin will be the only 2 user roles that can actually update and delete a given product;



