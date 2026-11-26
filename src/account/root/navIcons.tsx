/**
 * NOMAD theme: sidebar menu icons.
 *
 * Filled Material icons (as used in the nomad-lab.eu settings menu), keyed by
 * the menu item's label from `assets/content.ts`. Items without an entry are
 * shown without an icon.
 */

const paths: Record<string, string> = {
    // AccountCircle (NOMAD "Profile")
    personalInfo:
        "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6m0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20",
    // Key (NOMAD "Tokens")
    signingIn:
        "M21 10h-8.35C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H13l2 2 2-2 2 2 4-4.04zM7 15c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3",
    // Devices
    deviceActivity:
        "M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1m-1 9h-4v-7h4z",
    // Link
    linkedAccounts:
        "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1M8 13h8v-2H8zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5",
    // Apps
    applications:
        "M4 8h4V4H4zm6 12h4v-4h-4zm-6 0h4v-4H4zm0-6h4v-4H4zm6 0h4v-4h-4zm6-10v4h4V4zm-6 4h4V4h-4zm6 6h4v-4h-4zm0 6h4v-4h-4z",
    // VerifiedUser
    verifiableCredentials:
        "M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5zm-2 16-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9z",
    // Group
    groups: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3m-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3m0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5m8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5",
    // Business
    organizations:
        "M12 7V3H2v18h20V7zM6 19H4v-2h2zm0-4H4v-2h2zm0-4H4V9h2zm0-4H4V5h2zm4 12H8v-2h2zm0-4H8v-2h2zm0-4H8V9h2zm0-4H8V5h2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8zm-2-8h-2v2h2zm0 4h-2v2h2z",
    // Share
    resources:
        "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92"
};

export function NavIcon({ name }: { name: string }) {
    const d = paths[name];
    if (!d) return null;
    return (
        <span className="nomad-nav-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
                <path d={d} />
            </svg>
        </span>
    );
}
