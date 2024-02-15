# Learning TS with Microsoft

## Badges Overview

Here is mine collection of badges I earned from completing Microsoft Learn's TypeScript modules:

1. **Getting Started with TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/en-us/SvetaIlina-5865/HYLHV2A8?sharingId=CF3D41B4AA8478B9)
2. **Declare Variable Types in TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/en-us/SvetaIlina-5865/FZ9FFA8X?sharingId=CF3D41B4AA8478B9)
3. **Implement Interfaces in TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/en-us/SvetaIlina-5865/PTZJDVV4?sharingId=CF3D41B4AA8478B9)
4. **Develop Typed Functions in TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/en-us/SvetaIlina-5865/7ENQ6RPZ?sharingId=CF3D41B4AA8478B9)
5. **Declare and Instantiate Classes in TypeScript**: [Badge]()
6. **Generics in TypeScript**: [Badge]()
7. **Work with External Libraries in TypeScript**: [Badge]()
8. **Organize Code with Namespaces in TypeScript**: [Badge]()

## Reflections

- **Getting Started with TypeScript**  
  In this module I learned what TS is, how it differs from JS and how it improves it.
  I learned where I can write code in TS (any text editor or IDE), how to install TS (necessary packages and config file), how create projects in this language in VSC and how to compile it into JS.
  After passing this module I got basic knowledge to start working with TS and now I can use it to write code for my projects.
- **Declare Variable Types in TypeScript**  
  By completing this module I gained a deeper understanding of the key difference and advantage of TS, namely that as a strictly typed language it allows you to describe the shape of an object, providing better documentation, and allows for code validation.
  I learned what data types are available in TS , as well as how you can associate types with variables through explicit type annotations or through implicit type inference.
  Applying the acquired knowledge I learned to declare variables using primitive types, object types, union and intersection types.
  These skills in practice will allow me to avoid many errors and to handle values of unknown types more correctly.
- **Implement Interfaces in TypeScript**  
  In this module, I gained an understanding of what an interface is, its main tasks, and its practical applications.
  I learned that interfaces are often the key point of contact between any two pieces of TypeScript code, especially when working with existing JavaScript code or embedded JavaScript objects.
  They are particularly useful for documenting and verifying the required form of properties, objects passed as parameters, and objects returned from functions. This allows you to catch errors and make sure you pass the correct parameters at compile time, rather than waiting for them to be learned about at runtime.
  I also realized the difference between interfaces and type aliases, namely that a type alias cannot be reopened to add new properties, whereas an interface can always be extended.
  Knowing what properties an interface can have (mandatory, optional, or read-only) and that interfaces can extend each other will allow us to create more flexible and reusable Also, an interface can be used to describe array types and create custom array types, as well as to describe and JavaScript API, which gives us the ability to work with external JavaScript libraries
- **Develop Typed Functions in TypeScript**  
  Going through this module allowed me to understand what are the similarities (just like in js there are Named functions, Anonymous functions, Arrow functions)
  and how functions in JS and TS differ, what new features Ts brings, how it makes working with functions easier,
  for example, TypeScript simplifies function development and makes troubleshooting easier by allowing parameters and return values.
  TypeScript also adds new options for parameters. They can be required, optional, default, or rest.
  While all parameters are optional in JavaScript functions, in TypeScript you can define functions with optional, default, rest, and deconstructed parameters.
  This is important when you are working with large code bases or functions designed by other people.
  In addition, function allows you to check the types of the values passed to the function and the return values.
  You can also define function types and then use them when creating your own functions.
  This design is useful if you want to apply the same function type signature to multiple functions.
  You can define a function type using a type alias or an interface. An interface is better to use if you want to be able to extend the function type.
  Type alias is better to use if you want to use unions or tuples.
  Applying the acquired knowledge will allow you to improve the quality of written code, to handle the behavior of functions with different parameters more correctly
