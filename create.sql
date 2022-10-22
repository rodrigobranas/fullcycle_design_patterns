create schema fc;
create table fc.loan (
	code text,
	amount numeric,
	period integer,
	rate numeric,
	type text
);

create table fc.installment (
	loan_code text,
	number integer,
	amount numeric,
	interest numeric,
	amortization numeric,
	balance numeric
);
