
* Declarations with var: Always 
* Use Array and Object literals instead of Array and Object constructors.

* **Naming Conventions**
	- Constants(configuration or something that way) => ``` NAMES_LIKE_THIS ```
	- constant data or payload type => ``` Name_Like_This ``` 
	- Class/Component => ``` PascalCase ```
	- Functions => ``` camelCase ```
	- Css classes/ids => ``` hyphen-class ```
	- Do not use trailing or leading underscores.
	- Components : PascalCase
	- Functionals : camelCase
	
*  **Object Shorthands**
	- Use object method shorthand

					// bad
					const atom = {
					  value: 1,
					  addValue: function (value) {
					    return atom.value + value;
					  },
					};
					// good
					const atom = {
					  value: 1,
					  addValue(value) {
					    return atom.value + value;
					  },
					};
                    
   - Use property value shorthand
	
                    const lukeSkywalker = 'Luke Skywalker';
						// bad
						const obj = {
						  lukeSkywalker: lukeSkywalker,
						};
						// good
						const obj = {
						  lukeSkywalker,
					};
                    
	- Group your shorthand properties at the beginning of your object declaration.


*  **Functions**
	- Name your anonymous functions. This is helpful for stack traces.
				
                    // bad
					var log = function (msg) {console.log(msg);};
					
                    // good
					var log = function log(msg) {console.log(msg);};
               
	- Wrap immediately invoked function expressions in parentheses
	- Never declare a function in a non-function block.Assign the function to a variable instead. Browsers will allow you to do it, but they all interpret it differently.

*  **Imports and exports**
	- Do not export directly from an import.
	- In modules with a single export, prefer default export over named export. 
	- Put all imports above non-import statements


*  **Spaces and Indentation**
	- Do not add spaces inside [brackets] ``` [1,2,3] a[0] ```
	- Add spaces inside curly braces. ``` const foo = { clark: 'kent' };``` 
	- 2 tab indentation 
	- Around 70-80 character line length (except documentation)

* **Extras**
	- Always use semicolons.
	- Prefer ' over "
	- Leading commas in object properties : Nope
	- When programmatically building up strings, use template strings instead of concatenation.
	- Never use eval() on a string, it opens too many vulnerabilities.


```
{
	author:['kumar','deepak'],
	dated:'26 Oct,2016'
}
```