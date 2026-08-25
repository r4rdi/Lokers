[{
	"resource": "/d:/Projects/lokers-ai/apps/web/src/app/api/cv/parse/route.ts",
	"owner": "typescript",
	"code": "1192",
	"severity": 8,
	"message": "Module '\"d:/Projects/lokers-ai/apps/web/node_modules/pdf-parse/dist/pdf-parse/esm/index\"' has no default export.",
	"source": "ts",
	"startLineNumber": 2,
	"startColumn": 8,
	"endLineNumber": 2,
	"endColumn": 16,
	"modelVersionId": 5,
	"origin": "extHost1"
},{
	"resource": "/d:/Projects/lokers-ai/apps/web/src/app/api/cv/parse/route.ts",
	"owner": "typescript",
	"code": "2322",
	"severity": 8,
	"message": "Type '{ type: SchemaType; properties: { personal_info: { type: SchemaType; properties: { full_name: { type: SchemaType; }; email: { type: SchemaType; }; phone: { ...; }; location: { ...; }; headline: { ...; }; }; required: string[]; }; experiences: { ...; }; skills: { ...; }; education: { ...; }; }; required: string[]; }' is not assignable to type 'Schema | undefined'.\n  Type '{ type: SchemaType; properties: { personal_info: { type: SchemaType; properties: { full_name: { type: SchemaType; }; email: { type: SchemaType; }; phone: { ...; }; location: { ...; }; headline: { ...; }; }; required: string[]; }; experiences: { ...; }; skills: { ...; }; education: { ...; }; }; required: string[]; }' is not assignable to type 'SimpleStringSchema | EnumStringSchema | NumberSchema | IntegerSchema | BooleanSchema | ArraySchema | ObjectSchema'.\n    Type '{ type: SchemaType; properties: { personal_info: { type: SchemaType; properties: { full_name: { type: SchemaType; }; email: { type: SchemaType; }; phone: { ...; }; location: { ...; }; headline: { ...; }; }; required: string[]; }; experiences: { ...; }; skills: { ...; }; education: { ...; }; }; required: string[]; }' is not assignable to type 'ObjectSchema'.\n      Types of property 'type' are incompatible.\n        Type 'SchemaType' is not assignable to type 'SchemaType.OBJECT'.",
	"source": "ts",
	"startLineNumber": 88,
	"startColumn": 9,
	"endLineNumber": 88,
	"endColumn": 23,
	"modelVersionId": 5,
	"origin": "extHost1"
}]