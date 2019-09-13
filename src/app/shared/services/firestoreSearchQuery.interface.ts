import { FieldPath } from '@angular/fire/firestore';
import { WhereFilterOp } from '@firebase/firestore-types';

export interface FirestoreSearchQuery {
  where?: {
    fieldPath: string | FieldPath;
    opStr: WhereFilterOp;
    value: any;
  }[];
  // where?: string;
  limit?: number;
}
