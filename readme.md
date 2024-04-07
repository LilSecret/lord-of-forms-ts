# Lord of the Forms

You work for a SAAS company in middle earth and your task is to build a form where you can submit your information about your:

- First Name
- Last Name
- City
- Email
- Phone Number (in a proper middle-earth format XX-XX-XX-X )

For this assignment we want to a make an extremely user friendly UI where we can accomplish the following things.

- Making it as easy as possible to fill out the correct data
- Everything should look pretty
- Input Validation Errors are rendered to the user

We are going to build out a form that's purpose is to gather and set the `userInformation` of the parent component.

## Learning Objectives

In order to complete this assignment, a student should be able to...

- Create an advanced controlled form
- Use onChange events to track the state of an input
- Use onSubmit events to trigger the submit of a form
- Use `e.preventDefault` to stop the default event of an `onSubmit`
- Be able to prevent typing certain characters by controlling the onChange event
- Use a ref in react in order to switch focus between elements on change (Telephone Input)
- Render client-side validation errors in react underneath the inputs
- Cleanly abstract validations
- Create a useful user-friendly UI for form submission
- Use onSubmit to cleanly trigger a change in state of a parent component

## Setup

To get this project setup, you should:

- Run `npm i` to install all dependencies
- Run `npm run dev` to run the project

## Standard Requirements

- [x] Setup eslint
- [x] Pass all linting checks

- To check if linting passes, run `npm run lint`

- [x] Format code with prettier
- [x] State should not be duplicated
- [x] Variables should be named logically
- [x] No unnecessary console logs
- [x] No commented out blocks of code (Code comments are fine)
- [x] Setup a github repository with your submission as the `main` branch, you will submit a link to this for grading (NOT A ZIP FILE)

## Typescript Specific Requirements

- [x] pass **ALL** type-checks
  - Check by running `npm run typecheck`
- [x] DON'T USE `any`.... OR ELSE
- [x] Keep your types clean and in a logical location
- [x] Prop Types for components should be collocated with their components
- [x] Shared types should live in a file that says `types` somewhere in it's name
  - [x] example: `types.ts` should work fine
- [x] Unshared types should live in the component they are used in

## Assignment Specific Requirements

Example Template:

My recommendation is read through all the requirements once, then focus more on matching 👇 that UI. Then at the end use the checklist to make sure that you covered all of the UI and requirements, this checklist should make more sense as you start coding.

- [x] Get your code to function EXACTLY like [This Site](https://lord-of-the-forms.vercel.app/)

Validation UI

- [x] Under input errors should not show UNLESS the user has already tried submitting once
- [x] Errors should go away as soon as the field is fixed, not on submit
- [x] If a user tries to submit a form with bad inputs, an alert message will say "Bad Inputs" then the exact errors will pop up under the incorrect inputs
- [x] When a user successfully submits the form, it should update the userInformation and show the user information in the ProfileInformation Component
- [x] First Name should be at least 2 characters long and should not contain numbers
- [x] Last Name should be at least 2 characters long and should not contain numbers
- [x] Email should pass the `isEmailValid` function
- [x] City should be valid according to the `City Information` section below
- [x] You should have a `isCityValid` function located in `validations.ts` that returns true or false depending on the input
- [x] Phone number should be 7 characters long, and every characters should be a number 0-9
- [x] You should have a `isPhoneValid` function located in `validations.ts` that returns true or false depending on the input

Phone Number UI

- [x] When you store a phone number in state it should NOT have all the `-` characters in what you are storing
- [x] Display a phone number with the format `NN-NN-NN-N`
  - use this function in your `ProfileInformation` component to render the correct thing to the screen

Phone Input

- [x] Create a `FunctionalPhoneInput` component to clean up code
- [x] Create a `ClassPhoneInput` component to clean up code
- [x] The telephone input should work EXACTLY like on the example site
- [x] Typing in the max characters on one input should move to the next input
- [x] Deleting should go to the previous input as necessary
- [x] Inputs should be tracked with a state that looks like this ["", "", "", ""]
- [x] A User cannot type any non-numeric characters into a telephone input

City Information

- [x] A valid city should be in the list of `allCites` found in `all-cities.ts`
- [x] A valid city does NOT have to be the same casing,"Hobbiton" or "hobbiton" should pass validation
- [x] Make a `isValidCity` function that checks to see if an input is a valid city

Text Inputs

- [x] Create a `FunctionalTextInput` component that groups the label and the input together
- [x] Create a `ClassTextInput` component to clean up code

Form

- [x] Page must NOT reload after submitting
- [x] ClassApp Code and FunctionalApp Code should be treated as separate apps as far as state goes

Profile Information Component

- You can share this between the `FunctionalApp` and the `ClassApp`
- build a `capitalize` function in `transformations.ts` to correctly display a first and last name

- [x] build a `formatPhone` function in `transformations.ts` that will turn "1234567" into "12-34-56-7"
- [x] use `capitalize` and `formatPHone` in the `ProfileInformation` component in order to format things appropriately

Email Validations

- You will need to validate that the email is a valid email
- We've provided a function called `isEmailValid` in `validations.ts`
