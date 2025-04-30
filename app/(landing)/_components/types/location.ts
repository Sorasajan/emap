// app/types/location.ts
export interface Location {
  locationId: string;
  "Name of the location": string;
  "Name of the charger": string;
  "Contact No": string;
  address: {
    street1: string;
    street2: string;
    city: string;
    state: string;
  };
  available: boolean;
  "Maps details": {
    coordinates: [number, number];
  };
  "Plugs details": {
    connectorStatus: "Available" | "Unavailable";
    physicalReference: string;
    maxOutputPower: number;
  }[];
}
