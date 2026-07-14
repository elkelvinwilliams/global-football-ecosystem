/**
 * Versioned event contracts. Producers write to the transactional outbox;
 * consumers are idempotent. Never mutate a published version - add v2.
 */
export const Events = {
  UserVerified: "identity.user.verified.v1",
  MediaTranscoded: "talent.media.transcoded.v1",
  StatSuperseded: "talent.stat.superseded.v1",
  TrialInvited: "market.trial.invited.v1",
  MandateConsented: "rep.mandate.consented.v1",
  BadgeGranted: "trust.badge.granted.v1",
  AnchorConfirmed: "trust.anchor.confirmed.v1",
} as const;
