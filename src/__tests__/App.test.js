import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import App from "../src/App";
import profile from "../src/profile.jpeg"; // Import the profile variable or provide the image URL directly

// Portfolio Elements
test("displays a top-level heading with the text `Hi, I'm _______`", () => {
  render(<App />);
  const topLevelHeading = screen.getByRole("heading", {
    name: /hi, i'm/i,
    exact: false,
    level: 1,
  });
  expect(topLevelHeading).toBeInTheDocument();
});

test("displays an image of yourself", () => {
  render(<App />);
  const image = screen.getByAltText("My profile pic");
  expect(image).toHaveAttribute("src", profile); // Replace 'profile' with the actual URL of your profile image or import the correct variable
});
 
test("displays second-level heading with the text `About Me`", () => {
  render(<App />);
  const secondLevelHeading = screen.getByRole("heading", {
    name: /about me/i,
    level: 2,
  });
  expect(secondLevelHeading).toBeInTheDocument();
});

test("displays a paragraph for your biography", () => {
  render(<App />);
  const bio = screen.getByText(/your biography text/i); // Replace 'your biography text' with the actual text of your biography
  expect(bio).toBeInTheDocument();
});

test("displays the correct links", () => {
  render(<App />);
  const githubLink = screen.getByRole("link", {
    name: /github/i,
  });
  const linkedinLink = screen.getByRole("link", {
    name: /linkedin/i,
  });
  expect(githubLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://github.com")
  );
  expect(linkedinLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://linkedin.com")
  );
});

// Newsletter Form - Initial State
test("the form includes text inputs for name and email address", () => {
  render(<App />);
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
});

test("the form includes three checkboxes to select areas of interest", () => {
  render(<App />);
  const interest1Checkbox = screen.getByLabelText(/interest 1/i);
  const interest2Checkbox = screen.getByLabelText(/interest 2/i);
  const interest3Checkbox = screen.getByLabelText(/interest 3/i);
  expect(interest1Checkbox).toBeInTheDocument();
  expect(interest2Checkbox).toBeInTheDocument();
  expect(interest3Checkbox).toBeInTheDocument();
});

test("the checkboxes are initially unchecked", () => {
  render(<App />);
  const interest1Checkbox = screen.getByLabelText(/interest 1/i);
  const interest2Checkbox = screen.getByLabelText(/interest 2/i);
  const interest3Checkbox = screen.getByLabelText(/interest 3/i);
  expect(interest1Checkbox).not.toBeChecked();
  expect(interest2Checkbox).not.toBeChecked();
  expect(interest3Checkbox).not.toBeChecked();
});

// Newsletter Form - Adding Responses
test("the page shows information the user types into the name and email address form fields", () => {
  render(<App />);
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
  expect(nameInput).toHaveValue('John Doe');
  expect(emailInput).toHaveValue('john@example.com');
});

test("checked status of checkboxes changes when user clicks them", () => {
  render(<App />);
  const interest1Checkbox = screen.getByLabelText(/interest 1/i);
  fireEvent.click(interest1Checkbox);
  expect(interest1Checkbox).toBeChecked();
});

test("a message is displayed when the user clicks the Submit button", () => {
  render(<App />);
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const submitButton = screen.getByRole('button', { name: /submit/i });
  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
  fireEvent.click(submitButton);
  const submittedMessage = screen.getByText(/thank you for signing up/i);
  expect(submittedMessage).toBeInTheDocument();
});
