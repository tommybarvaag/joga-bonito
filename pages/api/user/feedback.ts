import prisma from "@/lib/prisma";
import { getFeedbackEmailTemplate } from "@/utils/emailUtils";
import { getSessionUserActiveDirectoryId } from "@/utils/sessionUtils";
import sendGridMail from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function Feedback(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).end();
  }

  const sessionUserActiveDirectoryId = getSessionUserActiveDirectoryId(session);

  if (sessionUserActiveDirectoryId === null || sessionUserActiveDirectoryId === undefined) {
    return res.status(400).end();
  }

  if (req.method === "GET") {
    const feedback = await prisma.userFeedback.findMany({
      include: {
        user: true
      }
    });

    return res.status(200).json(
      (feedback ?? []).reduce(
        (acc, curr) => [
          ...acc,
          {
            ...curr,
            user: {
              name: curr.user.name,
              email: curr.user.email
            }
          }
        ],
        []
      )
    );
  }

  const {
    id: userId,
    email,
    name
  } = await prisma.user.findUnique({
    where: { activeDirectoryId: sessionUserActiveDirectoryId }
  });

  if (req.method === "POST") {
    const message: string = req.body.message;
    const reaction: number = +req.body.reaction;

    if (message === null || message === undefined) {
      return res.status(400).end();
    }

    await prisma.userFeedback.create({
      data: {
        feedback: message,
        reaction: reaction,
        userId
      }
    });

    const sendGridApiKey = process.env.SEND_GRID_API_KEY;

    if (sendGridApiKey) {
      sendGridMail.setApiKey(sendGridApiKey);

      await sendGridMail.send({
        to: process.env.FEEDBACK_RECIPIENT_EMAIL,
        from: "tommy.barvag@knowit.no",
        subject: `kxb.app feedback from ${name}`,
        html: getFeedbackEmailTemplate(name, message, email)
      });
    }

    return res.status(204).end();
  }

  return res.send("Method not allowed.");
}
