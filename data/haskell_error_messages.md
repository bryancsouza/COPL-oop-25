---
path: "/error_haskell_messages"
title: "Common Haskell error messages"
hidden: false
information_page: true
sidebar_priority: 2000
---



### Dealing with Errors

Since Haskell is a typed language, you’ll pretty quickly bump into type errors. Here’s an example of an error during a GHCi session:

```Haskell
Prelude> "string" ++ True

<interactive>:1:13: error:
    • Couldn't match expected type ‘[Char]’ with actual type ‘Bool’
    • In the second argument of ‘(++)’, namely ‘True’
        In the expression: "string" ++ True
        In an equation for ‘it’: it = "string" ++ True
```

This is the most common type error, “Couldn’t match expected type”. Even though the error looks long and scary, it’s pretty simple if you just read through it.

*   The first line of the error message, `<interactive>:1:13: error:` tells us that the error occurred in GHCi. If we had loaded a file, we might instead get something like `Sandbox.hs:3:17: error:`, where `Sandbox.hs` is the name of the file, `3` is the line number and `17` is the number of a character in the line.

*   The line `• Couldn't match expected type ‘[Char]’ with actual type ‘Bool’` tells us that the immediate cause for the error is that there was an expression of type `Bool`, when GHCi was expecting to find an expression of type `[Char]`“. The location of this error was indicated in the first line of the error message. Note that the expected type is not always right. Giving type annotations by hand can help debugging typing errors.

*   The line `• In the second argument of ‘(++)’, namely ‘True’` tells that the expression that had the wrong type was the second argument of the operator `(++)`. We’ll learn later why it’s surrounded by parentheses.

*   The full expression with the error was `"string" ++ True`. As mentioned above, `String` is a type alias for `[Char]`, the type of character lists. The first argument to `++` was a list of characters, and since `++` can only combine two lists of the same type, the second argument should’ve been of type `[Char]` too.

*   The line `In an equation for ‘it’: it = "string" ++ True` says that the expression occurred in the definition of the variable `it`, which is a default variable name that GHCi uses for standalone expressions. If we had a line `x = "string" ++ True` in a file, or a declaration `let x = "string" ++ True` in GHCi, GHCi would print `In an equation for ‘x’: x = "string" ++ True` instead.


There are also others types of errors.
```Haskell
Prelude> True + 1

<interactive>:6:1: error:
    • No instance for (Num Bool) arising from a use of ‘+’
    • In the expression: True + 1
        In an equation for ‘it’: it = True + 1
```
This is the kind of error you get when you try to use a numeric function like `+` on something that’s not a number.

The hardest error to track down is usually this:

```Haskell
    Prelude> True +

    <interactive>:10:7: error:
        parse error (possibly incorrect indentation or mismatched brackets)
```
There are many ways to cause it. Probably you’re missing some characters somewhere. We discuss Indendation in the end of part 15.

```haskell
No instance for (Eq a) arising from a use of ‘==’
```
You’ve probably tried to use `x==Nothing` to check if a value is `Nothing`. Use pattern matching instead. The reason for this error is that values of type `Maybe a` can’t be compared because Haskell doesn’t know how to compare values of the polymorphic type `a`. You’ll find more about this in the next lecture. Use pattern matching instead of `==` for now.
