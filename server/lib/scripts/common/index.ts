import * as mongoose from "mongoose";
export const defaults = {
    DistributionCenterDefaultDistanceInMeters: 10000
}
export async function _mongooseTransactionAsync(_transactionCallbackAsync: () => Promise<void>) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        await _transactionCallbackAsync();
        await session.commitTransaction();
        session.endSession();
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error; // Rethrow so calling function sees error
    }
}
