import { SealedSecret } from "@kubernetes-models/sealed-secrets/bitnami.com/v1alpha1/SealedSecret";

const secret = new SealedSecret({
  metadata: {
    name: "my-secret"
  },
  spec: {
    encryptedData: {
      foo: "AgBy3i4OJSWK+PiTySYZZA9rO43cGDEq"
    }
  }
});

// Validate against JSON schema
secret.validate();
console.log("🚀 ~ file: index.ts:16 ~ secret:", secret)
