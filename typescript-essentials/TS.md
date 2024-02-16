# Learning TS with Microsoft

## Badges Overview

Here is mine collection of badges I earned from completing Microsoft Learn's TypeScript modules:

1. **Getting Started with TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/en-us/SvetaIlina-5865/HYLHV2A8?sharingId=CF3D41B4AA8478B9)
2. **Declare Variable Types in TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/en-us/SvetaIlina-5865/FZ9FFA8X?sharingId=CF3D41B4AA8478B9)
3. **Implement Interfaces in TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/en-us/SvetaIlina-5865/PTZJDVV4?sharingId=CF3D41B4AA8478B9)
4. **Develop Typed Functions in TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/en-us/SvetaIlina-5865/7ENQ6RPZ?sharingId=CF3D41B4AA8478B9)
5. **Declare and Instantiate Classes in TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/en-us/SvetaIlina-5865/WACAPLUN?sharingId=CF3D41B4AA8478B9)
6. **Generics in TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/en-us/SvetaIlina-5865/7ENP23GZ?sharingId=CF3D41B4AA8478B9)
7. **Work with External Libraries in TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/en-us/SvetaIlina-5865/WACVJAVN?sharingId=CF3D41B4AA8478B9)
8. **Organize Code with Namespaces in TypeScript**: [Badge](https://learn.microsoft.com/api/achievements/share/en-us/SvetaIlina-5865/WACMF3GN?sharingId=CF3D41B4AA8478B9)

## Build JavaScript applications using TypeScript [Badge](https://learn.microsoft.com/api/achievements/share/en-us/SvetaIlina-5865/24XTMAWV?sharingId=CF3D41B4AA8478B9)

## Reflections

- **Getting Started with TypeScript**  
  In this module I learned what TS is, how it differs from JS and how it improves it.
  I learned where I can write code in TS (any text editor or IDE), how to install TS (necessary packages and config file), how create projects in this language in VSC and how to compile it into JS.
  Understanding compiler options and configurations is very important to optimize your TypeScript workflow.Using tsconfig.json allows you to maintain a consistent configuration throughout your TypeScript project and simplifies the compilation process by eliminating the need to specify options each time you run the tsc command.
  After passing this module I got basic knowledge to start working with TS and now I can use it to write code for my projects.
- **Declare Variable Types in TypeScript**  
  By completing this module I gained a deeper understanding of the key difference and advantage of TS, namely that as a strictly typed language it allows you to describe the shape of an object, providing better documentation, and allows for code validation.
  I learned what data types are available in TS , as well as how you can associate types with variables through explicit type annotations or through implicit type inference.
  Applying the acquired knowledge I learned to declare variables using primitive types, object types, union and intersection types.
  Types form the foundation of your code, providing the basis for more complex structures. Understanding them is essential for efficient and type-safe programming.
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
  Understanding how to annotate function parameters and return types is critical to effective development in TypeScript.
  Applying the acquired knowledge will allow you to improve the quality of written code, to handle the behavior of functions with different parameters more correctly
- **Declare and Instantiate Classes in TypeScript**
  The information in this module deepens understanding of what classes are for, how they can be created, and how TS features help us use them.
  Like JS, TypeScript implements an object-oriented approach and has full support for classes.
  One feature is that Classes in TypeScript create two separate types: the instance type, which defines what members an instance of a class has, and the constructor function type, which defines what members the class constructor function has. Unlike JS, TypeScript supports the access modifiers public,private and protected,readonly, which determine the accessibility of class members. If an access modifier is not defined, it is implicitly interpreted as public, as this is consistent with the nature of JavaScript.
  in Typescript you can also use an interface to ensure class instance shape.
  Both structures (class and interface) define what an object looks like, and both can be used in TypeScript to create objects.
  The decision to use a class or an interface depends entirely on the particular case: whether only type checking is needed, whether implementation details (usually through the creation of a new instance) are needed
  or both cases at the same time.Unlike classes, an interface is a virtual structure that exists only in the context of TypeScript.
  The TypeScript compiler uses interfaces solely for the purpose of property type checking.
  A class defines a schema for how an object should look and act, and then implements that object by initializing the class properties and defining its methods.
  In a nutshell, if you need to create an instance of an object while getting the benefits of type checking entities such as arguments,
  return types or generics, it makes sense to use a class.
  prefer to used classes if you are creating a full stack application with client and server implementations and
  you need to define how the data will be structured.
  If you are not creating instances - you can use interfaces, their advantage is that they do not create any additional code,
  but they do provide a "virtual" type-checking of the code.
  Since both an interface and a class define the structure of an object and can be interchangeable in some cases, we can define that structure in an interface and then implement that interface in each class.  
   Practicing with classes in TypeScript allows us to create modular, reusable, and well-organized code.
  They help model complex systems in a way that reflects real-world entities and relationships.
- **Generics in TypeScript**
  This module was about feature, that are supported by many programming languages, but not by JS - Generics.
  Its cool and poverfull tool which provide a way to tell functions, classes, or interfaces what type you want to use when you call it.
  Generics are code templates that you can define and reuse throughout your codebase.
  If you want to create a component that can work over a variety of types rather than just one,generic enables you to tell the component what type it should expect.
  The main advantage of generics is definition one or more type variables to identify the type or types that you will pass to the component.
  After you specify the type variable, it can be used wherever the type annotation is needed.
  You can use more than one type variable in your generic components.
  To further protect yourself from errors, you can use so-called generic constraints (restricting the types a parameter can take to a specific type range).
  You can use it with native types, with custom types and classes.
  Also you can use the typeof (for primitive type) or instanceof (for object) type guard in an if block to check the type of the value parameter before performing an operation.
  Using generics with primitive types, like number, string, or boolean, illustrate the concepts of generics well, but the most powerful uses come from using them with custom types and classes.
  Using generics is especially useful when we work with third-party code and cannot influence the type of data provided (for example, today the exchange rate is transmitted as a string,
  and yesterday it was passed as a numeric code, while we still get a string code for old history records).
  Generics allow us to type functions and classes that can be called with different number of arguments and their types. By taking this module I learned about generics and their parameterization, learned how to use them to type variables, functions and methods, as well as classes.
  I learned how to restrict types and help TypeScript with type inference if necessary by using Type Guard.
  The main advantages of generics I can name are providing more flexibility when working with types, reusing code, and reducing the need to use any type.
- **Work with External Libraries in TypeScript** After studying this module, I learned what peculiarities there are when working with modules in TS, how to install third-party libraries.
  This information significantly expands the possibilities of organizing code and helps to control its availability in the global namespace,
  which helps to avoid name conflicts between components.
  As well as in JS, the export and import keywords are used for interaction between modules.
  The module syntax in TS is not much different from JS, except, of course, for typing. For example, TS extends the import syntax with import type, which allows only types to be imported.
  To compile modules, you must specify the --module target on the command line or in the tsconfig.json file for the project (e.g., commonjs, es6). It is also important to note that in order for the JS file to work successfully after compilation, it is necessary to specify the .js extension in the paths to imported files.
  An important aspect of this module was working with third-party libraries. They can be imported as well as your own modules (unlike JS you need to use impotn instead of required).
  But there is one nuance - types in the library may not be defined and then the compiler will generate an error.
  To avoid this, the library should be installed with the @types prefix.
  Practical exercises of this module gave an opportunity to apply new knowledge in practice and consolidate it.This topic is very important for understanding the correct code organization, which helps to speed up development, avoid conflicts, makes code more readable and understandable, simplifies code maintenance and further modification
- **Organize Code with Namespaces in TypeScript** This module extends the understanding of the possibilities that TS provides for organizing code.
  In addition to modules, you can use namespaces.
  Namespaces (called "internal modules" in early versions of TypeScript) are a TypeScript-specific way of organizing and categorizing code,
  allowing related code to be grouped together.
  Namespaces reduce the amount of code in the global scope, provide context for names to help reduce naming collisions, and increase reusability.
  You can also nest namespaces within namespaces, which gives you even more ways to organize your code.But as nested namespaces become more complex
  you may want to create an alias to shorten and simplify your code. To do this, use the import keyword.
  Compiling a namespace into a single file is the same as compiling any other TypeScript file.
  Because namespaces are a TypeScript-only construct, they are removed from the resulting JavaScript code and convertedinto variables, which are nested into namespace-like objects as needed. Namespaces can be extended by sharing them across multiple TypeScript files.If namespaces are in multiple files that are linked together, link tags must be added to tell the TypeScript compiler about the links between the files.An important part of the module was learning the differences between modules and namespaces.Although namespaces and modules have some similarities, they are used in different ways. Namespaces are typically used to organize and group related code. Modules, on the other hand, are used to create reusable code that can be imported and used in other parts of your code.Namespaces can also lead to name conflicts and can be difficult to manage in large projects. Namespaces are typically used to organize and group related code, and they are independent of the module loader. Modules, on the other hand, are used to create reusable code that can be imported and used in other parts of your code.
  Modules, on the other hand, provide better organization and encapsulation and can help prevent name conflicts.
  In general, TypeScript recommends using modules instead of namespaces
  Even so, it is important to understand namespaces because there may be cases where namespaces are more appropriate, such as when working with legacy code that was written before modules were introduced in TypeScript.

  ## Conclusion

  TypeScript is a programming language that is a superset of JavaScript. It adds static typing and some additional features that help developers create more reliable and scalable applications.
  Its pluses include:

  - Static typing - allows to detect errors at the compilation stage;
  - Improved tool support - good integration with IDEs and other development tools;
  - Compatible with JavaScript - you can use existing JavaScript code in TypeScript;
  - Implements many OOP concepts such as inheritance, polymorphism, encapsulation, and access modifiers. It has classes, interfaces, and (even!) abstract classes;
  - Improved support for large projects - structures the code base and increases its maintainability;
  - Easy implementation in an existing project - you can incrementally add TypeScript to existing JavaScript code;
    But it also has disadvantages:
  - The need to add types may require additional time and effort;
  - In some cases, it may take more time to develop and maintain the code;
  - Need to ensure TypeScript training and adoption within the development team
    Comparing TypeScript and JavaScript, you can see that TS is a great OOP language with which you can write large applications more efficiently.
    Despite the more complex code and extra compilation time, it will help you save time in the long run.
