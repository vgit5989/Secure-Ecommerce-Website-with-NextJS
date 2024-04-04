import { zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import * as zxcvbnEnPackage from "@zxcvbn-ts/language-en";

export function validatePassword(password: string): string {
  // Check for length
  if (password.length < 8) {
    return "Password should be at least 8 characters";
  }

  if (password.length > 64) {
    return "Password should not be more than 64 characters";
  }

  // Check for uppercase letter
  if (!/[A-Z]/.test(password)) {
    return "Password should contain at least one uppercase letter";
  }

  // Check for lowercase letter
  if (!/[a-z]/.test(password)) {
    return "Password should contain at least one lowercase letter";
  }

  // Check for digit
  if (!/[0-9]/.test(password)) {
    return "Password should contain at least one digit";
  }

  // Check for special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Password should contain at least one special character";
  }

  const options = {
    translations: zxcvbnEnPackage.translations,
    graphs: zxcvbnCommonPackage.adjacencyGraphs,
    dictionary: {
      ...zxcvbnCommonPackage.dictionary,
      ...zxcvbnEnPackage.dictionary,
    },
  };

  zxcvbnOptions.setOptions(options);

  // Check password strength using zxcvbn
  const result = zxcvbn(password);
  if (result.score < 3) {
    const str = "Password is too easy to guess: " + result.feedback.warning;
    return str;
  }

  // If all checks pass
  return "Password is valid";
}
