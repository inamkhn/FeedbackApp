import * as React from "react";
import { Html } from "@react-email/html";
import { Button } from "@react-email/button";
import {
  Font,
  Head,
  Heading,
  Preview,
  Row,
  Section,
  Text,
  Container,
} from "@react-email/components";

type EmailTypes = {
  username: string;
  otp: string;
};

export function EmailVerification({ username, otp }: EmailTypes) {
  return (
    <Html lang="en">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <style>{`
          .container {
            padding: 20px;
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            border-radius: 8px;
            max-width: 600px;
            margin: 0 auto;
          }
          .heading {
            color: #333;
            font-size: 24px;
          }
          .text {
            color: #555;
            font-size: 16px;
            line-height: 1.5;
          }
          .otp {
            font-size: 20px;
            font-weight: bold;
            color: #333;
            margin-top: 10px;
            margin-bottom: 10px;
          }
          .footer {
            color: #888;
            font-size: 14px;
            margin-top: 20px;
            text-align: center;
          }
        `}</style>
      </Head>
      <Preview>Here&apos;s your verification code: {otp}</Preview>
      <Container className="container">
        <Section>
          <Row>
            <Heading as="h2" className="heading">Hello {username},</Heading>
          </Row>
          <Row>
            <Text className="text">
              Thank you for registering. Please use the following verification
              code to complete your registration:
            </Text>
          </Row>
          <Row>
            <Text className="otp">{otp}</Text>
          </Row>
          <Row>
            <Text className="text">
              If you did not request this code, please ignore this email.
            </Text>
          </Row>
          <Row>
            <Button href="http://example.com/verify" style={{ marginTop: '20px' }}>
              Verify Now
            </Button>
          </Row>
        </Section>
        <Text className="footer">If you have any questions, contact our support.</Text>
      </Container>
    </Html>
  );
}

export default EmailVerification;
