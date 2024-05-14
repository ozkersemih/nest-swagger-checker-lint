import * as process from 'node:process';
import { ESLint } from 'eslint';
import { TSESTree } from '@typescript-eslint/types';
import { ESLintUtils } from '@typescript-eslint/utils';
import { SwaggerAnalyzer } from 'nest-swagger-checker';

// * Utils

// The Rule creator returns a function that is used to create a well-typed ESLint rule
// The parameter passed into RuleCreator is a URL generator function.
const createRule = ESLintUtils.RuleCreator(name => `https://my-website.io/eslint/${name}`);

const now = () => Date.now() / 1000;

// * State

let ERRORS: Record<string, any> = {};
let FIRST_RUN = true;

// * SwaggerAnalyzer stuff

const swagger = new SwaggerAnalyzer({
    interactive: false,
});

ERRORS = swagger.run();

// HACK: ...
setTimeout(() => {
    FIRST_RUN = false;
}, 5000);

const getErrors = (overwrittenFiles) => {
    if (FIRST_RUN) {
        return ERRORS;
    }
    return swagger.run({ overwrittenFiles });
};

const semihRule = createRule({
    create(context) {
        return {
            ClassDeclaration(node) {
                console.log({fname: context.filename, physcical: context.physicalFilename})
                getErrors([[context.filename, context.sourceCode.text]])[context.filename]?.forEach((e) => {
                    console.log("Reporting", e.line);
                    // @ts-ignore
                    context.report({
                        messageId: 'asdasd',
                        loc: {
                            column: e.col,
                            line: e.line,
                        }
                    });
                });
            },
        };
    },
    name: 'uppercase-first-declarations',
    meta: {
        docs: {
            description:
                'Function declaration names should start with an upper-case letter.',
        },
        messages: {
            asdasd: 'Start this name with an upper-case letter.',
        },
        type: 'suggestion',
        schema: [],
    },
    defaultOptions: [],
});

export const rules = {
    'semih-rule': semihRule,
}
