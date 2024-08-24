pub fn is_valid_email(email: &str) -> bool {
    const EMAIL_REGEX: &str = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";

    let regex: regex::Regex = regex::Regex::new(EMAIL_REGEX).unwrap();
    regex.is_match(email)
}
