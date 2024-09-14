use std::{error::Error, fmt::Display};

#[derive(Debug)]
pub(crate) struct NotLoggedIn;

impl Display for NotLoggedIn {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str("Not logged in")
    }
}

impl Error for NotLoggedIn {}

#[derive(Debug)]
pub(crate) enum SignupError {
    EmailExists,
    InvalidUsername,
    InvalidEmail,
    PasswordsDoNotMatch,
    MissingDetails,
    InvalidPassword,
    InternalError,
}

impl Display for SignupError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            SignupError::InvalidUsername => f.write_str("Invalid username"),
            SignupError::InvalidEmail => f.write_str("Invalid email"),
            SignupError::EmailExists => f.write_str("Email already exists"),
            SignupError::PasswordsDoNotMatch => f.write_str("Passwords do not match"),
            SignupError::MissingDetails => f.write_str("Missing Details"),
            SignupError::InvalidPassword => f.write_str("Invalid Password"),
            SignupError::InternalError => f.write_str("Internal Error"),
        }
    }
}

impl Error for SignupError {}

#[derive(Debug)]
pub(crate) enum LoginError {
    ServerError,
    MissingDetails,
    UserDoesNotExist,
    WrongPassword,
}

impl Display for LoginError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            LoginError::ServerError => f.write_str("Server error"),
            LoginError::UserDoesNotExist => f.write_str("User does not exist"),
            LoginError::MissingDetails => f.write_str("Missing details"),
            LoginError::WrongPassword => f.write_str("Wrong password"),
        }
    }
}

impl Error for LoginError {}

#[derive(Debug)]
pub(crate) struct NoUser(pub String);

impl Display for NoUser {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_fmt(format_args!("could not find user '{}'", self.0))
    }
}

impl Error for NoUser {}

#[derive(Debug)]
pub(crate) enum SessionError {
    InvalidToken,
    InternalError,
}

impl Display for SessionError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            SessionError::InvalidToken => f.write_str("Invalid token"),
            SessionError::InternalError => f.write_str("Internal error"),
        }
    }
}

impl Error for SessionError {}
