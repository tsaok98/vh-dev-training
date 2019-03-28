# Introduction (intro)

The goal of these homeworks is not solely review (although we'll be doing plenty of that). It's also to introduce important concepts that we don't have the time for in class and to preview what we'll be doing next week. There already exists a file in this folder called "hw.ts". For each question, you'll be writing a new function with the title being the parenthetical next to the header - like `intro` above. Put everything in that function then call it immediately after (like in the sample). Note that you can do anything you want in a function - even define another function inside it, like in the sample.

```js
const outer = () => {
	const inner = () => {
		Number.isNaN(2); // just checks if 2 is a number
	};
	inner();
};
outer();
```

In some cases, you'll be asked to give a text answer in this document. Places like that will be noted with an `@response:`

## All the world's an object (objectively)

We mentioned in class that everything is an object. Let's explore what that means.

1. If `console.log` is a function and everything is an object... does that mean that `console` itself is an object? Try logging `console` and describing what that outputs. Anything interesting?

`@response:` The console outputs an array of attribute for console commands. Also what appears to be hackerspotted scores.

We didn't really explore how to declare and access objects in class. That's because the syntax is quite simple:

```ts
const myObject = {a: 0: b: 2, c: 3};
console.log(myObject.a);

// this way is worse but allows us to dynamically select the key.
console.log(myObject["b"])

// if we want to add a new key
myObject.newKey = 7;
myObject["newKey"] = 20;

const momAndDad = ["Matt","Nidhi"];

// we can even dynamically create a key in a new object
const prezPlaces = {[momAndDad[0]]: "Nashville",[momAndDad[1]]: "Dublin" };

// notice what we do there. We access a position in the array with the [] operator and then using the spceial [] (this is called computed property names), we create keys with those array values. That's neat.
```

2. Take a look at at the `whatAmI`. It's created like an object with the {} on the outside. But, if you were to access its values, you would do something like: `whatAmI[0]`... which is exactly like an array! So, what do you think the difference is between `whatAmI` and an actual array [created normally](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array?)?

`@response:` There's not really one, braces are used for objects, brackets are used with raw basic data contents.

3. Let's take a look at an actual object. Go to [this](https://spot.benc.me/?time=1549939921) site. That's the #hackerspotted results from the week of Feb 12 (note: both Firefox and Chrome have great extensions called JSONView that will help read this. Alternatively, you can go to [jsonlint.com](https://jsonlint.com/), paste it and "validate JSON" to make it readable.). A few questions:

   1. If you had to say what this "was", what would you say? Is it an array? Is it an object? If it is an array, what is the type of elements? If it's an object, what is the type of the values?

   `@response:` Json is json. it's an object containing an a group of other objects, therefore similar to an array. Type: standard string/int/etc

   1. Let's play with it in code. I've already written code that will grab it from the server (you just need to fill in the URL for `getDataFromAPI`). Take a couple minutes and just explore it. Pick a person (maybe yourself) and try to get the code to print out just the data for that person. You don't have to turn in the code that does that.
   2. Write code that given a number, `n` (so define a variable `n` that can easily be changed) will return the `n`th highest person _by unique spots_ (note that they array is currently sorted by score), using score as a tiebreaker. For example, if `n=3`, you should return the object with the person of id "U9CT31PCG" (I'm omitting their name from here for privacy reasons). Return that person's object.
      take the returned json, and parse for the 3rd value from it, so function((n) => {
      return data[n];
      }); This object can then be further be parsed with dot notation. and magic.

## Awry Arrays (awry)

Arrays in JS are super cool because they have a lot of specific functions. For example, these two lines of code do the exact same thing yet one is more readable.

```ts
const arr = [1, 2, 3, 4, 5];

for (let i = 0; i < arr.length; i++) {
	console.log(arr[i]);
}

arr.forEach(el => console.log(el));
```

1. Here's a good chance to practice searching for documentation. Create an empty array (call it docTesterIndex). Then, write code that using _only_ the .forEach construct from earlier will fill the empty array with values such that for every element `i`, the following holds: `docTesterIndex = docTester[i] + i`. Hint: the callback above doesn't use every possible parameter.

let docTesterIndex = [];
docTester.forEach( (el, i) => {
docTesterIndex[i] = el + i;
});

2. Now let's do the same thing with `Array.map`. Like C++'s `std::transform`, this applies a function to every value in an array and returns the transformed array. Take a look:

```ts
[1, 2, 3].map(el => el ** 0.5); // creates an array of the square root of each number
```

3. There's an easy way to check if you did part 1 correctly. We can sum up all the values in `docTesterIndex`. On average, we should get around 549,000. This is easyish to do with a for loop... but there's a better way: Array.reduce. Using MDN's documentation and this example, use Array.reduce to sum up `docTesterIndex`.

```ts
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
arr.reduce((acc, el) => (acc *= el), 1); // multiplies all the numbers together
```

One last thing before we go back to the hackerspotted API. Array methods are designed to be chained. For example, we can combine the previous two examples by adding the index to each element and then multiplying all the values by each other.

```ts
const arr = [];
for (let i = 0; i < 1000; i++) arr[i] = Math.floor(Math.random() * 100);

let i = 0; // this is bad style but I don't want to give away the answer the 1st array question.
// this will add the index to each value then multiply all the values together
arr.map(el => el + ++i).reduce((acc, el) => (acc *= el), 1);
```

4. Let's try something neat. Using `Array.sort` and `Array.filter` (not necessarily in that order), redo the last problem from the object section except this time, only count people who are spotted 3 times, more than 3 times or 0 times.

## Finishing up

To run the Typescript file, `npm run hw-dev` is the way to go. You should also see something in the bottom left that looks like this ![alt text](https://shared.benc.io/screencaps/2019/03/5382b84d-7149-43c6-8e46-a2ae3f3f4e9b.png 'npm script viewer'). You can run any npm script by clicking the "play" button on each.

Before submitting, you should

1. `npm run lint`. If it returns any errors or warnings, you should fix before submitting. Some errors/warnings can be fixed with `npm run lint:fix`. Others will require manual intervention.
2. `npm run hw`. This should run without errors and create a js file called `hw.js`. Test this file by running it with `node` like we did early during the meeting. It should have the same result as your Typescript file being run.
3. Answer this question: what do you notice that the Typescript transpiler did to your code? How did it transform it?

@response: The typescript transpilier turns it into code that the node engine can run.
