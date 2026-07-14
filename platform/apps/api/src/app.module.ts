import { Module } from "@nestjs/common";
import { IdentityModule } from "./modules/identity/identity.module";
import { TalentModule } from "./modules/talent/talent.module";
import { MarketplaceModule } from "./modules/marketplace/marketplace.module";
import { RepresentationModule } from "./modules/representation/representation.module";
import { TrustModule } from "./modules/trust/trust.module";
import { CommsModule } from "./modules/comms/comms.module";
import { AdminModule } from "./modules/admin/admin.module";

/**
 * Modular monolith. Bounded contexts communicate through application
 * services and the event outbox only - never via each other's internals.
 * docs/02-architecture/system-architecture.md section 4 is the law here.
 */
@Module({
  imports: [
    IdentityModule,
    TalentModule,
    MarketplaceModule,
    RepresentationModule,
    TrustModule,
    CommsModule,
    AdminModule,
  ],
})
export class AppModule {}
