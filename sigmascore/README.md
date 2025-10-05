# Sigma Score

Sigma Score is a Next.js web application that uses Google's Gemini AI to analyze a user's "sigma potential" from an uploaded image. It provides a "sigma score" based on various facial and body features.

## Features

-   **AI-Powered Sigma Analysis:** Leverages Google Gemini to analyze images and provide a detailed "sigma score".
-   **User Authentication:** Secure user authentication using Firebase.
-   **Personal Dashboard:** Users can track their sigma score, rank, and scan history.
-   **Leaderboard:** A global leaderboard to rank users based on their sigma scores.
-   **Sigma Scanner:** An interface to upload images for analysis.

## Technical Stack

-   **Framework:** [Next.js](https://nextjs.org/)
-   **UI:** [React](https://react.dev/), [shadcn/ui](https://ui.shadcn.com/), [Tailwind CSS](https://tailwindcss.com/)
-   **Backend:** [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
-   **AI:** [Google Gemini](https://ai.google.dev/)
-   **Database:** [Firebase Firestore](https://firebase.google.com/docs/firestore)
-   **Authentication:** [Firebase Authentication](https://firebase.google.com/docs/auth)

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
