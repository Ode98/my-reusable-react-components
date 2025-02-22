import { DateTime } from 'luxon';

type CommonDateReturnFormat = 'time' | 'date' | 'dateTime' | 'apiDate';

function getApiDateAsLuxonDate(time: string) {
	return DateTime.fromFormat(time, 'yyyy-MM-dd HH:mm:ss', {
		zone: 'utc',
	}).setZone('local');
}

export function getISODateAsLuxonDate(time: string) {
	return DateTime.fromISO(time, {
		zone: 'utc',
	}).setZone('local');
}

function returnToFormat(
	luxonDateTime: DateTime,
	format: CommonDateReturnFormat,
) {
	switch (format) {
		case 'time':
			return luxonDateTime.toFormat('HH:mm');
		case 'date':
			return luxonDateTime.toFormat('dd.MM.yyyy');
		case 'dateTime':
			return luxonDateTime.toFormat('dd.MM.yyyy HH:mm');
		case 'apiDate':
			return luxonDateTime.toFormat('yyyy-MM-dd HH:mm:ss');
		default:
			return luxonDateTime.toFormat('dd.MM.yyyy HH:mm');
	}
}

export function formatFromApiDate(
	time: string,
	returnFormat: CommonDateReturnFormat = 'dateTime',
): string {
	return returnToFormat(getApiDateAsLuxonDate(time), returnFormat);
}

export function formatFromIsoTime(
	time: string,
	returnFormat: CommonDateReturnFormat,
) {
	const luxonDate = getISODateAsLuxonDate(time);
	return returnToFormat(luxonDate, returnFormat);
}

export function formatFromApiDateToJsDate(time: string): Date {
	return getApiDateAsLuxonDate(time).toJSDate();
}

export function isApiDateToday(time: string) {
	const luxonDateTime = getApiDateAsLuxonDate(time);
	return luxonDateTime.hasSame(DateTime.now(), 'day');
}

export function getApiDateNowInUtc() {
	return DateTime.now().setZone('utc').toFormat('yyyy-MM-dd HH:mm:ss');
}

export function getApiDateNow() {
	return DateTime.now().setZone().toFormat('yyyy-MM-dd HH:mm:ss');
}

export function isAdult(birthDate: string) {
	const luxonDateA = getApiDateAsLuxonDate(birthDate);
	return luxonDateA.plus({ years: 18 }) <= DateTime.now();
}
