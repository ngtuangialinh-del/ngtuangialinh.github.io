import {
  Box,
  Button,
  Field,
  Grid,
  Heading,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuArrowUpRight } from "react-icons/lu";

import SectionShell from "../../components/shared/SectionShell";
import { contact } from "../../data/contact";
import { sectionCopy } from "../../data/sectionCopy";

const messageLimit = 5000;

export function MedicalContact() {
  const copy = sectionCopy.contact;
  const [name, setName] = useState("");
  const [replyTo, setReplyTo] = useState("");
  const [message, setMessage] = useState("");
  const draftBody = [
    `Name: ${name || "Not provided"}`,
    `Reply-to email: ${replyTo || "Not provided"}`,
    "",
    message,
  ].join("\n");
  const draftHref = `mailto:?subject=${encodeURIComponent(contact.draftSubject)}&body=${encodeURIComponent(draftBody)}`;
  const fieldStyles = {
    bg: "rgba(255,255,255,.07)",
    borderColor: "rgba(255,255,255,.24)",
    color: "#fff",
    _placeholder: { color: "rgba(255,255,255,.46)" },
    _hover: { borderColor: "rgba(158,216,206,.64)" },
    _focusVisible: {
      borderColor: "#9ed8ce",
      boxShadow: "0 0 0 2px rgba(158,216,206,.28)",
    },
  } as const;

  return (
    <SectionShell
      id="contact"
      eyebrow={copy.eyebrow}
      title={copy.title}
      intro={copy.intro}
      maxW="1180px"
    >
      <Box
        as="form"
        onSubmit={(event) => event.preventDefault()}
        bg="var(--brand-800)"
        color="#fff"
        border="1px solid"
        borderColor="var(--border-strong)"
        borderTop="4px solid"
        borderTopColor="var(--brand-500)"
        borderRadius="lg"
        p={{ base: 6, md: 9 }}
        boxShadow="var(--shadow-md)"
        className="reveal-up delay-1"
        data-testid="contact-form"
      >
        <Grid
          templateColumns={{ base: "1fr", lg: ".9fr 1.1fr" }}
          gap={{ base: 5, lg: 12 }}
          alignItems="start"
        >
          <Heading
            as="h3"
            className="editorial-font"
            fontSize={{ base: "2xl", md: "3xl" }}
            lineHeight="1.25"
            letterSpacing="-.02em"
            maxW="21ch"
          >
            {contact.statement}
          </Heading>
          <Text color="rgba(255,255,255,.72)" lineHeight="1.75">
            {contact.privacyNote}
          </Text>
        </Grid>

        <Box
          my={{ base: 7, md: 9 }}
          borderTop="1px solid"
          borderColor="rgba(255,255,255,.17)"
        />

        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={5}>
          <Field.Root>
            <Field.Label className="field-code" color="#9ed8ce">
              Name
            </Field.Label>
            <Input
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              placeholder="Your name"
              h="52px"
              {...fieldStyles}
              data-testid="contact-name"
            />
          </Field.Root>
          <Field.Root>
            <Field.Label className="field-code" color="#9ed8ce">
              Reply-to email
            </Field.Label>
            <Input
              type="email"
              value={replyTo}
              onChange={(event) => setReplyTo(event.target.value)}
              autoComplete="email"
              inputMode="email"
              placeholder="you@example.com"
              h="52px"
              {...fieldStyles}
              data-testid="contact-reply-to"
            />
          </Field.Root>
        </Grid>

        <Field.Root mt={5}>
          <Field.Label className="field-code" color="#9ed8ce">
            Message
          </Field.Label>
          <Textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            maxLength={messageLimit}
            placeholder="Write your message"
            minH={{ base: "220px", md: "300px" }}
            resize="vertical"
            {...fieldStyles}
            data-testid="contact-message"
          />
          <Text
            alignSelf="flex-end"
            fontSize="sm"
            color="rgba(255,255,255,.68)"
            aria-live="polite"
            data-testid="contact-character-count"
          >
            {message.length} / {messageLimit}
          </Text>
        </Field.Root>

        <Grid
          mt={{ base: 7, md: 9 }}
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap={5}
          alignItems="center"
        >
          <Text color="rgba(255,255,255,.72)" lineHeight="1.7">
            {contact.draftHelper}
          </Text>
          <Button
            asChild
            h="56px"
            bg="#9ed8ce"
            color="#0b3531"
            fontWeight={800}
            justifyContent="space-between"
            px={5}
            _hover={{ bg: "#b9e7df", transform: "translateY(-1px)" }}
          >
            <a
              href={draftHref}
              aria-label={`${contact.draftButtonLabel}; opens your email application without a recipient`}
              data-testid="contact-open-draft"
            >
              {contact.draftButtonLabel}
              <LuArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        </Grid>
      </Box>
    </SectionShell>
  );
}

export default MedicalContact;
